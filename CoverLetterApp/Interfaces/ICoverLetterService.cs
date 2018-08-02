using CoverLetterApp.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CoverLetterApp.Interfaces
{
    public interface ICoverLetterService
    {
        // This is the Reponse that will be the output, then running a method and passing url
        Task<List<JobInfo>> GetAll(string url);
    }
}