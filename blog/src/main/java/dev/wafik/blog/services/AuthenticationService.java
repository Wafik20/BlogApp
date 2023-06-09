package dev.wafik.blog.services;

import dev.wafik.blog.controllers.auth.AuthenticationRequest;
import dev.wafik.blog.controllers.auth.AuthenticationResponse;
import dev.wafik.blog.controllers.auth.RegisterRequest;
import dev.wafik.blog.expception.AuthException;
import dev.wafik.blog.model.Role;
import dev.wafik.blog.model.User;
import dev.wafik.blog.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public User register(RegisterRequest request) throws Exception {
        try {
            String userEmail = request.getEmail();
            if (userRepository.existsByEmail(userEmail)) {
                throw new AuthException("A user with this email already exists");
            }
            var user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.ROLE_USER)
                    .build();
            userRepository.save(user);
            return user;

        } catch (AuthException e) {
            throw e;
        } catch (Exception e) {
            throw new Exception("An error occurred while registering user");
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        boolean userExists = userRepository.findByEmail(request.getEmail()).isPresent();
        User user = userRepository.findByEmail(request.getEmail()).get();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
}
