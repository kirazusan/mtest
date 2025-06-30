

using Microsoft.AspNetCore.Mvc;
using UIKit;
using System;

namespace backend.Controllers
{
    public class StartupController : Controller
    {
        private IApplicationState _applicationState;

        public StartupController(IApplicationState applicationState)
        {
            _applicationState = applicationState;
        }

        [HttpGet]
        public IActionResult StartApplication()
        {
            try
            {
                _applicationState.UpdateState(ApplicationState.Started);
                int result = UIApplication.Main(new string[] { }, null, typeof(UIApplication));
                if (result != 0)
                {
                    throw new Exception("UIApplication.Main returned non-zero exit code");
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _applicationState.UpdateState(ApplicationState.Failed);
                return StatusCode(500, ex.Message);
            }
        }
    }

    public interface IApplicationState
    {
        void UpdateState(ApplicationState state);
    }

    public enum ApplicationState
    {
        Started,
        Failed
    }
}