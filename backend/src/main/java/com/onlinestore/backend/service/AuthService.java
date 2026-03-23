package com.onlinestore.backend.service;

import com.onlinestore.backend.dto.AuthRequest;
import com.onlinestore.backend.dto.AuthResponse;
import com.onlinestore.backend.dto.RegisterRequest;
import com.onlinestore.backend.entity.User;
import com.onlinestore.backend.repository.UserRepository;
import com.onlinestore.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthResponse register(RegisterRequest request) {
		if (userRepository.findByEmail(request.email()).isPresent()) {
			throw new IllegalArgumentException("Email already registered");
		}
		User user = User.builder()
				.email(request.email())
				.password(passwordEncoder.encode(request.password()))
				.firstName(request.firstName())
				.lastName(request.lastName())
				.role("USER")
				.build();
		userRepository.save(user);
		return new AuthResponse(jwtService.generateToken(user));
	}

	public AuthResponse authenticate(AuthRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.email(), request.password()));
		User user = userRepository
				.findByEmail(request.email())
				.orElseThrow(() -> new IllegalArgumentException("User not found"));
		return new AuthResponse(jwtService.generateToken(user));
	}
}
