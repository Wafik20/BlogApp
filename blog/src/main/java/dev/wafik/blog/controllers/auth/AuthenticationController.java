package dev.wafik.blog.controllers.auth;

import dev.wafik.blog.expception.AuthException;
import dev.wafik.blog.model.User;
import dev.wafik.blog.services.AuthenticationService;
import dev.wafik.blog.services.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final CurrentUserService currentUserService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        try {
            User user = authenticationService.register(request);
            return ResponseEntity.ok(user);
        } catch (AuthException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<User> currentUser() {
        try {
            User user = currentUserService.getCurrentUser();
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

}
