using AngleSharp;
using CoverLetterApp.Interfaces;
using CoverLetterApp.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CoverLetterApp.Controllers.Api
{
    [RoutePrefix("api/coverletter")]
    public class CoverLetterApiController : ApiController
    {
        readonly ICoverLetterService coverLetterService;

        public CoverLetterApiController(ICoverLetterService coverLetterService)
        {
            this.coverLetterService = coverLetterService;
        }

        [Route(), HttpPost]
        public async Task<HttpResponseMessage> GetAll(string url)
        {
            try
            {
                // check if dice url
                if (url.Contains("dice.com"))
                {
                    List<JobInfo> JobInfo = new List<JobInfo>();
                    JobInfo = await coverLetterService.GetAll(url);

                    if (JobInfo == null)
                    {
                        var message = string.Format("No content found with the URL provided.");
                        HttpError err = new HttpError(message);
                        return Request.CreateResponse(HttpStatusCode.NoContent, err);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, JobInfo);
                }
                else
                { 
                    var message = string.Format("Not a Dice Url. Forbidden.");
                    HttpError err = new HttpError(message);
                    return Request.CreateResponse(HttpStatusCode.Forbidden, err);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}

