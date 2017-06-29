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
        public IHttpActionResult Get()
        {
            try
            {
                List<CategoryVM> categoryList = new List<CategoryVM>();
                var categories = Uow.Categories.GetAll();
                foreach (var category in categories)
                {
                    var categoryVM = new CategoryVM { CategoryID = category.CategoryID, CategoryName = category.CategoryName, Description = category.Description, Picture = category.Picture };
                    categoryList.Add(categoryVM);
                }
                return Ok(categoryList);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                Category category = Uow.Categories.GetById(id);

                if (category == null)
                {
                    return NotFound();
                }

                var categoryVM = new CategoryVM { CategoryID = category.CategoryID, CategoryName = category.CategoryName, Description = category.Description, Picture = category.Picture };
                return Ok(categoryVM);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]CategoryVM categoryVM)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var category = new Category { CategoryID = categoryVM.CategoryID, CategoryName = categoryVM.CategoryName, Description = categoryVM.Description, Picture = categoryVM.Picture };
                Uow.Categories.Add(category);
                Uow.Save();

                return Created(new Uri(Request.RequestUri + "/" + category.CategoryID.ToString()), category);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT api/<controller>/5
        public IHttpActionResult Put(int id, [FromBody]CategoryVM categoryVM)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var category = new Category { CategoryID = categoryVM.CategoryID, CategoryName = categoryVM.CategoryName, Description = categoryVM.Description, Picture = categoryVM.Picture };
                if (id != category.CategoryID)
                {
                    return BadRequest();
                }

                Uow.Categories.Edit(category);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Category category = Uow.Categories.GetById(id);
                if (category == null)
                {
                    return NotFound();
                }

                Uow.Categories.Delete(id);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}