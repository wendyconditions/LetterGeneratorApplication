using AngleSharp;
using CoverLetterApp.Interfaces;
using CoverLetterApp.Models.Requests;
using CoverLetterApp.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CoverLetterApp.Services
{
    public class CoverLetterService : ICoverLetterService
    {
        public async Task<List<JobInfo>> GetAll(WebScrapeRequest model)
        {
            List<JobInfo> Test = new List<JobInfo>();

            var config = Configuration.Default.WithDefaultLoader();
            string address = model.Url;
            var document = await BrowsingContext.New(config).OpenAsync(address);

            var urls =
                document.QuerySelectorAll("body")
                .Select(m => new UrlContainer
                {
                    Urls =
                         m.QuerySelectorAll("a")
                         .Where(a => a.ClassList.Contains("turnstileLink") && !a.ClassList.Contains("jobtitle"))
                         .Select(a => a.GetAttribute("href"))
                         .ToList()
                }).FirstOrDefault();

            foreach (var item in urls.Urls)
            {
                string newAddress = item;
                var doc = await BrowsingContext.New(config).OpenAsync("https://www.indeed.com" + newAddress);
                try
                {
                    if (!doc.Url.Contains("prime") && !doc.Url.Contains("cmp"))
                    {
                        var data =
                        doc.QuerySelectorAll("body")
                        .Select(m => new JobInfo
                        {
                            Title = m.QuerySelector(".jobtitle").TextContent,
                            Company = m.QuerySelector(".company").TextContent,
                            Quals = m.QuerySelectorAll("li").Select(node => node.TextContent).ToList()
                        }).ToList();

                        foreach (var sub in data)
                        {
                            JobInfo newdata = new JobInfo();
                            newdata.Title = sub.Title;
                            newdata.Company = sub.Company;
                            newdata.Quals = sub.Quals;
                            Test.Add(newdata);
                        }
                    }
                    else if(doc.Url.Contains("vjs"))
                    {
                        var data =
                        doc.QuerySelectorAll("body")
                        .Select(m => new JobInfo
                        {
                            Title = m.QuerySelector(".jobtitle").TextContent,
                            Company = m.QuerySelector(".company").TextContent,
                            Quals = m.QuerySelectorAll("li").Select(node => node.TextContent).ToList()
                        }).ToList();

                        foreach (var sub in data)
                        {
                            JobInfo newdata = new JobInfo();
                            newdata.Title = sub.Title;
                            newdata.Company = sub.Company;
                            newdata.Quals = sub.Quals;
                            Test.Add(newdata);
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
                catch (Exception e)
                {

                    throw e;
                }


            }

            return Test;
        }
    }
}