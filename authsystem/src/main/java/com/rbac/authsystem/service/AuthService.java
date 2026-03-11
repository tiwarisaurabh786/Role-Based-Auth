package com.rbac.authsystem.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rbac.authsystem.dto.ApiResponse;
import com.rbac.authsystem.dto.JwtResponse;
import com.rbac.authsystem.dto.LoginRequest;
import com.rbac.authsystem.dto.RegisterRequest;
import com.rbac.authsystem.entity.Role;
import com.rbac.authsystem.entity.User;
import com.rbac.authsystem.repository.UserRepository;
import com.rbac.authsystem.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public ApiResponse<JwtResponse> register(RegisterRequest request) {
        try {
            System.out.println("=== Register Request ===");
            System.out.println("Email: " + request.email());
            System.out.println("Name: " + request.name());
            System.out.println("Role: " + request.role());

            if (userRepository.existsByEmail(request.email())) {
                return ApiResponse.error("Email already exists");
            }

            Role role;
            try {
                role = Role.fromValue(request.role());
            } catch (IllegalArgumentException e) {
                return ApiResponse.error("Invalid role: " + request.role() + ". Must be USER or ADMIN");
            }

            User user = User.builder()
                    .name(request.name())
                    .email(request.email())
                    .password(passwordEncoder.encode(request.password()))
                    .role(role)
                    .build();

            userRepository.save(user);
            System.out.println("User saved with ID: " + user.getId());

            String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole());
            System.out.println("Generated JWT: " + jwt);

            JwtResponse jwtResponse = new JwtResponse(
                jwt, 
                "Bearer", 
                user.getEmail(), 
                role.getValue()
            );
            
            System.out.println("JwtResponse: " + jwtResponse);
            System.out.println("=========================");

            return ApiResponse.success("Registration successful",jwtResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.error("Registration failed: " + e.getMessage());
        }
    }

    public ApiResponse<JwtResponse> login(LoginRequest request) {
        try {
            System.out.println("=== Login Request ===");
            System.out.println("Email: " + request.email());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            System.out.println("UserDetails loaded: " + userDetails.getUsername());
            
            // Fetch user from database to get role
            User user = userRepository.findByEmail(request.email())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            System.out.println("User role: " + user.getRole().getValue());
            
            String jwt = jwtUtil.generateToken(userDetails.getUsername(), user.getRole());
            System.out.println("Generated JWT: " + jwt);

            JwtResponse jwtResponse = new JwtResponse(
                jwt, 
                "Bearer", 
                userDetails.getUsername(), 
                user.getRole().getValue()
            );
            
            System.out.println("JwtResponse: " + jwtResponse);
            System.out.println("======================");

            return ApiResponse.success(jwtResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.error("Invalid credentials: " + e.getMessage());
        }
    }
}