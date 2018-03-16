using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoverLetterApp.Models.Responses
{
    //public class JobData
    //{
    //    public List<JobInfo> JobInfo { get; set; }
    //}

    public class JobInfo
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public QualInfo QualInfo { get; set; }
    }

    public class QualInfo
    {
        public List<string> Quals { get; set; }
        public string[] Matches { get; set; }
    }
}