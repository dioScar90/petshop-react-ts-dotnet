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

        private Task<List<ProductEntity>> GetProductsToList(bool orderedByCreatedAt)
        {
            if (orderedByCreatedAt)
                return _context.Products.Where(q => q.DeletedAt == null).OrderByDescending(q => q.CreatedAt).ToListAsync();
            
            return _context.Products.Where(q => q.DeletedAt == null).ToListAsync();
        }

        private Task<ProductEntity?> GetSpecificProduct(int id)
        {
            return _context.Products.FirstOrDefaultAsync(q => q.Id == id);
        }

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
        [Route("{orderedByCreatedAt:bool}")]
        public async Task<ActionResult<List<ProductEntity>>> GetAllProducts([FromRoute] bool orderedByCreatedAt = false)
        {
            var products = await GetProductsToList(orderedByCreatedAt);
            // var products = orderedByCreatedAt
            //     ? await _context.Products.OrderByDescending(q => q.CreatedAt).ToListAsync()
            //     : await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] int id)
        {
            var product = await GetSpecificProduct(id);

            if (product is null)
                return NotFound("Product Not Found");
            
            return Ok(product);
        }

        // Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] CreateUpdateProctDto dto)
        {
            var product = await GetSpecificProduct(id);

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
            var product = await GetSpecificProduct(id);

            if (product is null)
                return NotFound("Product Not Found");
            
            // _context.Products.Remove(product);
            product.DeletedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok("Product Deleted Successfully");
        }
    }
}
