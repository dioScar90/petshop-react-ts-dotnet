using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using backend.Context;
using backend.Entities;
using backend.Dtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // CRUD -> Creade - Read - Update - Delete

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateUpdateProctDto dto)
        {
            var newProduct = new ProductEntity()
            {
                Brand = dto.Brand,
                Title = dto.Title
            };

            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();

            return Ok("Product Saved Successfully");
        }

        // Read
        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);

            if (product is null)
                return NotFound("Product Not Found");
            
            return Ok(product);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] CreateUpdateProctDto dto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);

            if (product is null)
                return NotFound("Product Not Found");
            
            product.Title = dto.Title;
            product.Brand = dto.Brand;
            product.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok("Product Updated Successfully");
        }

        // Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);

            if (product is null)
                return NotFound("Product Not Found");
            
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok("Product Deleted Successfully");
        }
    }
}