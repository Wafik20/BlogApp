package dev.wafik.blog.controllers.home;
import dev.wafik.blog.model.User;
import dev.wafik.blog.services.CurrentUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {
    CurrentUserService currentUserService = new CurrentUserService();
    @GetMapping
    public ResponseEntity<String> home() {
        User curr = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok("Hello " + currentUserService.getCurrentUsername());
    }
}
