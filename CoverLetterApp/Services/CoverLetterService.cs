using AngleSharp;
using CoverLetterApp.Interfaces;
using CoverLetterApp.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AngleSharp.Extensions;
using System.Web.Http;

namespace CoverLetterApp.Services
{
    public class CoverLetterService : ICoverLetterService
    {
        public async Task<List<JobInfo>> GetAll(string url)
        {
            // Get urls to scrape
            UrlContainer UrlContainer = await GetUrlContainer(url);

            if(UrlContainer.Urls.Count == 0)
            {
                return null;
            }

            // Results from scraping individal pages
            List<JobInfo> JobInfo = await GetJobData(UrlContainer);

            return JobInfo;
        }

        public async Task<UrlContainer> GetUrlContainer(string url)
        {
            var config = Configuration.Default.WithDefaultLoader();
            string address = url;
            var document = await BrowsingContext.New(config).OpenAsync(address);

            var urls =
                document.QuerySelectorAll("body")
                .Select(m => new UrlContainer
                {
                    Urls =
                         m.QuerySelectorAll("a")
                         .Where(a => a.ClassList.Contains("dice-btn-link") && a.Id.Contains("position"))
                         .Select(a => a.GetAttribute("href"))
                         .Take(15)
                         .ToList()
                }).FirstOrDefault();

            return urls;
        }

        public async Task<List<JobInfo>> GetJobData(UrlContainer urlContainer)
        {
            List<JobInfo> JobInfo = null;
            var config = Configuration.Default.WithDefaultLoader();
            
            foreach (var item in urlContainer.Urls)
            {
                string newAddress = item;
                var doc = await BrowsingContext.New(config).OpenAsync("https://www.dice.com" + newAddress);

                try
                {
                    JobInfo Ji = doc.QuerySelectorAll("body")
                        .Select(m => new JobInfo
                        {
                            Title = m.QuerySelector(".jobTitle").TextContent,
                            Company = m.QuerySelector(".employer").FirstChild.NextSibling.TextContent,
                            QualInfo = new QualInfo
                            {
                                Quals = m.QuerySelectorAll(".highlight-black li").Select(node => node.TextContent).ToList(),
                                Matches = new string[0]
                            }
                        }).FirstOrDefault();

                    if (JobInfo == null)
                    {
                        JobInfo = new List<JobInfo>();
                    }
                    JobInfo.Add(Ji);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            return JobInfo;
        }
    }
}