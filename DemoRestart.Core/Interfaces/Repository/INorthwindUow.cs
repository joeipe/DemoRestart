using DemoRestart.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoRestart.Core.Interfaces.Repository
{
    public interface INorthwindUow : IDisposable
    {
        IRepository<State> States { get; }
        IRepository<Category> Categories { get; }

        void Save();
    }
}
