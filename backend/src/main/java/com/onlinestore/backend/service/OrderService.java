package com.onlinestore.backend.service;

import com.onlinestore.backend.dto.OrderItemRequest;
import com.onlinestore.backend.dto.OrderRequest;
import com.onlinestore.backend.entity.Order;
import com.onlinestore.backend.entity.OrderItem;
import com.onlinestore.backend.entity.Product;
import com.onlinestore.backend.entity.User;
import com.onlinestore.backend.repository.OrderRepository;
import com.onlinestore.backend.repository.ProductRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class OrderService {

	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final PaymentService paymentService;

	@Transactional
	public Order placeOrder(User user, OrderRequest request) {
		List<OrderItemRequest> itemRequests = request.items();
		if (itemRequests == null || itemRequests.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order must contain at least one item");
		}

		List<OrderItem> lineItems = new ArrayList<>();
		double totalAmount = 0.0;

		for (OrderItemRequest line : itemRequests) {
			if (line.quantity() == null || line.quantity() <= 0) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Each item must have a positive quantity");
			}
			Product product = productRepository
					.findById(line.productId())
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found: " + line.productId()));
			double lineTotal = product.getPrice() * line.quantity();
			totalAmount += lineTotal;
			lineItems.add(OrderItem.builder()
					.productId(product.getId())
					.quantity(line.quantity())
					.unitPrice(product.getPrice())
					.build());
		}

		boolean paid = paymentService.processPayment(totalAmount);
		String status = paid ? "PAID" : "FAILED";

		Order order = Order.builder()
				.user(user)
				.totalAmount(totalAmount)
				.orderDate(LocalDateTime.now())
				.status(status)
				.build();

		for (OrderItem lineItem : lineItems) {
			lineItem.setOrder(order);
			order.getOrderItems().add(lineItem);
		}

		return orderRepository.save(order);
	}

	@Transactional(readOnly = true)
	public List<Order> getOrdersForUser(User user) {
		return orderRepository.findByUserOrderByOrderDateDesc(user);
	}
}
