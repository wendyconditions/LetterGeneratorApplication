using AngleSharp;
using CoverLetterApp.Interfaces;
using CoverLetterApp.Models.Requests;
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

        [Route("job"), HttpPost]
        public async Task<HttpResponseMessage> GetAll(WebScrapeRequest model)
        {
            try
            {
                var response = new WebScrapeResponse();
                response.Job = await coverLetterService.GetAll(model);
                if(response.Job.Count == 0)
                {
                    var data = string.Format("Unfortunately, that search didn't have a good candidates to retrieve data from. Try another Url search.", model);
                    return Request.CreateErrorResponse(HttpStatusCode.NoContent, data);
                }
                return Request.CreateResponse(HttpStatusCode.OK, response);

            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            
            //catch (Exception ex)
            //{
            //    if(ex == null)
            //    {
            //        return Request.CreateErrorResponse(HttpStatusCode.NoContent, ex);
            //    } 
            //}
            //finally
            //{
            //    throw new Exception();
            //}

        }
    }
}

