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
            var config = Configuration.Default.WithDefaultLoader();
            string address = model.Url;
            var document = await BrowsingContext.New(config).OpenAsync(address);
            string selector = "body";
            var nodes = document.QuerySelectorAll(selector);
            var urlLink = nodes
                .Select(m => new JobInfo
                {
                    Title = m.QuerySelector(".jobtitle").TextContent,
                    Company = m.QuerySelector(".company").TextContent,
                    Quals = m.QuerySelectorAll("li").Select(node => node.TextContent).ToList()
                }).ToList();

            return urlLink;
        }
    }
}