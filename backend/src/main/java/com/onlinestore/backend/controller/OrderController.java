package com.onlinestore.backend.controller;

import com.onlinestore.backend.dto.OrderRequest;
import com.onlinestore.backend.entity.Order;
import com.onlinestore.backend.entity.User;
import com.onlinestore.backend.service.OrderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

	private final OrderService orderService;

	@PostMapping
	public Order placeOrder(@RequestBody OrderRequest request, @AuthenticationPrincipal User user) {
		return orderService.placeOrder(user, request);
	}

	@GetMapping
	public List<Order> getMyOrders(@AuthenticationPrincipal User user) {
		return orderService.getOrdersForUser(user);
	}
}
