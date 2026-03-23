package com.onlinestore.backend.repository;

import com.onlinestore.backend.entity.Order;
import com.onlinestore.backend.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@EntityGraph(attributePaths = "orderItems")
	List<Order> findByUserOrderByOrderDateDesc(User user);
}
