package com.rbac.authsystem.dto;

public record JwtResponse(
        String token,
        String type,
        String email,
        String role
) {}