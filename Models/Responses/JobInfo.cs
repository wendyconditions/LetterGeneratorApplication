using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoverLetterApp.Models.Responses
{
    public class JobInfo
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public List<string> Quals { get; set; }
    }
}