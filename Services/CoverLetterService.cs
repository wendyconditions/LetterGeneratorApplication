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
                         .Where(a => a.ClassList.Contains("jobtitle"))
                         .Select(a => a.GetAttribute("href"))
                         .ToList()
                }).ToList();

            foreach (var url in urls)
            {
                foreach (var token in url.Urls)
                {
                    string newAddress = token;
                    var doc = await BrowsingContext.New(config).OpenAsync("https://www.indeed.com" + newAddress);

                    if (doc.Url.Contains("www.indeed.com"))
                    {
                        var data =
                        doc.QuerySelectorAll("body")
                        .Select(m => new JobInfo
                    {
                        Title = m.QuerySelector(".jobtitle").TextContent,
                        Company = m.QuerySelector(".company").TextContent,
                        Quals = m.QuerySelectorAll("li").Select(node => node.TextContent).ToList()
                    }).ToList();


                        foreach (var item in data)
                        {
                            JobInfo newdata = new JobInfo();
                            newdata.Title = item.Title;
                            newdata.Company = item.Company;
                            newdata.Quals = item.Quals;
                            Test.Add(newdata);
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
            }

            return Test;
        }
    }
}