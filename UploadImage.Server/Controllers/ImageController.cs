using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UploadImage.Server.Data;

namespace UploadImage.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

        [HttpPost]
        public async Task<IActionResult> ImageUpload([FromForm] Image uploadImage)
        {
            if (uploadImage.File == null || uploadImage.File.Length == 0)
            {

                return BadRequest("No file Uploaded.");
            }
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
 
            }
            var filePath = Path.Combine(_uploadPath, uploadImage.File.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {

                await uploadImage.File.CopyToAsync(stream);
            };
            return Ok(new { filePath });

        }
    }
}
