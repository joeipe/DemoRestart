using DemoRestart.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace DemoRestart.Controllers
{
    public class ApiControllerBase : ApiController
    {
        public INorthwindUow Uow { get; set; }
    }
}