

using System;
using System.Web.Mvc;
using CalculatorService;
using Microsoft.Extensions.Logging;

namespace CalculatorController
{
    public class CalculatorController : Controller
    {
        private readonly ICalculatorService _calculatorService;
        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(ICalculatorService calculatorService, ILogger<CalculatorController> logger)
        {
            _calculatorService = calculatorService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Calculate(string num1, string num2, string operation)
        {
            try
            {
                if (_calculatorService == null)
                {
                    throw new InvalidOperationException("CalculatorService instance is null.");
                }

                var result = _calculatorService.Calculate(num1, num2, operation);
                return PartialView("_Result", result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during calculation.");
                return PartialView("_Error", ex.Message);
            }
        }
    }
}