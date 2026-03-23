package com.onlinestore.backend.service;

import com.onlinestore.backend.dto.FakeStoreProductDto;
import com.onlinestore.backend.entity.Product;
import com.onlinestore.backend.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import java.util.List;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

	private final ProductRepository productRepository;
	private final RestClient restClient;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
		this.restClient = RestClient.builder().baseUrl("https://fakestoreapi.com").build();
	}

	@PostConstruct
	public void syncProducts() {
		if (productRepository.count() != 0) {
			return;
		}
		List<FakeStoreProductDto> dtos = restClient
				.get()
				.uri("/products")
				.retrieve()
				.body(new ParameterizedTypeReference<List<FakeStoreProductDto>>() {});
		if (dtos == null || dtos.isEmpty()) {
			return;
		}
		List<Product> products = dtos.stream().map(this::toEntity).toList();
		productRepository.saveAll(products);
	}

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Product getProductById(Long id) {
		return productRepository
				.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
	}

	private Product toEntity(FakeStoreProductDto dto) {
		return Product.builder()
				.id(dto.id())
				.title(dto.title())
				.price(dto.price())
				.description(dto.description())
				.category(dto.category())
				.image(dto.image())
				.build();
	}
}
