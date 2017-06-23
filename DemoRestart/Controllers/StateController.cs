using DemoRestart.Core.Interfaces.Repository;
using DemoRestart.Core.Model;
using DemoRestart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoRestart.Controllers
{
    public class StateController : ApiControllerBase
    {
        public StateController(INorthwindUow uow)
        {
            Uow = uow;
        }

        // GET: api/State
        [HttpGet]
        public IEnumerable<State> GetStates()
        {
            return Uow.States.GetAll();
        }

        // GET: api/State/5
        [HttpGet]
        public HttpResponseMessage GetState(int id)
        {
            State state = Uow.States.GetById(id);

            if (state == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not found!");
            }

            return Request.CreateResponse<State>(HttpStatusCode.OK, state);
        }

        // POST: api/State
        [HttpPost]
        public HttpResponseMessage AddState([FromBody]StateVM stateVM)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
            var state = new State { ID=stateVM.ID, Name=stateVM.Name };
            Uow.States.Add(state);
            Uow.Save();

            var msg = Request.CreateResponse(HttpStatusCode.Created);
            msg.Headers.Location = new Uri(Request.RequestUri + "/" + state.ID.ToString());

            return msg;
        }

        // PUT: api/State/5
        [HttpPut]
        public HttpResponseMessage EditState(int id, [FromBody]StateVM stateVM)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var state = new State { ID = stateVM.ID, Name = stateVM.Name };
            if (id != state.ID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            Uow.States.Edit(state);

            try
            {
                Uow.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StateExists(id))
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                else
                {
                    throw;
                }
            }

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        // DELETE: api/State/5
        [HttpDelete]
        public HttpResponseMessage DeleteState(int id)
        {
            State state = Uow.States.GetById(id);
            if (state == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            Uow.States.Delete(id);
            Uow.Save();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                Uow.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StateExists(int id)
        {
            return Uow.States.GetAll().Count(e => e.ID == id) > 0;
        }
    }
}
