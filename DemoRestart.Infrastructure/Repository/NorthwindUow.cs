using DemoRestart.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DemoRestart.Core.Model;
using DemoRestart.Infrastructure.Data;

namespace DemoRestart.Infrastructure.Repository
{
    public class NorthwindUow : INorthwindUow
    {
        private NorthwindEntities context;

        public IRepository<State> States { get { return new SqlRepository<State>(context); } }

        public NorthwindUow()
        {
            CreateDbContext();
        }

        private void CreateDbContext()
        {
            context = new NorthwindEntities();
            context.Configuration.ProxyCreationEnabled = false;
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ValidateOnSaveEnabled = false;
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
