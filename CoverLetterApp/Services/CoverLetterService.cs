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
            List<string> UrlContainer = await GetUrlContainer(url);

            if (UrlContainer.Count < 1)
            {
                return null;
            }

            // Results from scraping individal result pages
            List<JobInfo> JobInfo = await GetJobData(UrlContainer);

            return JobInfo;
        }

        public async Task<List<string>> GetUrlContainer(string url)
        {
            var config = Configuration.Default.WithDefaultLoader();
            var document = await BrowsingContext.New(config).OpenAsync(url);
            int limit = 15;

            return
                document.QuerySelectorAll("body")
                .Select(m =>
                         m.QuerySelectorAll("a")
                         .Where(a => a.ClassList.Contains("dice-btn-link") && a.Id.Contains("position"))
                         .Select(a => a.GetAttribute("href"))
                         .Take(limit)
                         .ToList())
                         .FirstOrDefault();
        }

        public async Task<List<JobInfo>> GetJobData(List<string> urlContainer)
        {
            List<JobInfo> JobInfo = null;
            var config = Configuration.Default.WithDefaultLoader();

            foreach (var url in urlContainer)
            {
                var doc = await BrowsingContext.New(config).OpenAsync("https://www.dice.com" + url);

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