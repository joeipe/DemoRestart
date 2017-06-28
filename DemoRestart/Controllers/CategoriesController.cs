using DemoRestart.Core.Interfaces.Repository;
using DemoRestart.Core.Model;
using DemoRestart.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoRestart.Controllers
{
    public class CategoriesController : ApiControllerBase
    {
        public CategoriesController(INorthwindUow uow)
        {
            Uow = uow;
        }

        // GET api/<controller>
        public IEnumerable<CategoryVM> Get()
        {
            List<CategoryVM> categoryList = new List<CategoryVM>();
            var categories = Uow.Categories.GetAll();
            foreach (var category in categories)
            {
                var categoryVM = new CategoryVM { CategoryID = category.CategoryID, CategoryName = category.CategoryName, Description = category.Description, Picture = category.Picture };
                categoryList.Add(categoryVM);
            }
            return categoryList;
        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(int id)
        {
            Category category = Uow.Categories.GetById(id);

            if (category == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not found!");
            }

            var categoryVM = new CategoryVM { CategoryID = category.CategoryID, CategoryName = category.CategoryName, Description = category.Description, Picture = category.Picture };
            return Request.CreateResponse<CategoryVM>(HttpStatusCode.OK, categoryVM);
        }

        // POST api/<controller>
        public HttpResponseMessage Post([FromBody]CategoryVM categoryVM)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
            var category = new Category { CategoryID = categoryVM.CategoryID, CategoryName = categoryVM.CategoryName, Description = categoryVM.Description, Picture = categoryVM.Picture };
            Uow.Categories.Add(category);
            Uow.Save();

            var msg = Request.CreateResponse(HttpStatusCode.Created);
            msg.Headers.Location = new Uri(Request.RequestUri + "/" + category.CategoryID.ToString());

            return msg;
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put(int id, [FromBody]CategoryVM categoryVM)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            var category = new Category { CategoryID = categoryVM.CategoryID, CategoryName = categoryVM.CategoryName, Description = categoryVM.Description, Picture = categoryVM.Picture };
            if (id != category.CategoryID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            Uow.Categories.Edit(category);

            try
            {
                Uow.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id)
        {
            Category category = Uow.Categories.GetById(id);
            if (category == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            Uow.Categories.Delete(id);
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

        private bool CategoryExists(int id)
        {
            return Uow.Categories.GetAll().Count(e => e.CategoryID == id) > 0;
        }
    }
}