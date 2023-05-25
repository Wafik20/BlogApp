package dev.wafik.blog.services.comment;

import dev.wafik.blog.model.Comment;
import dev.wafik.blog.repositories.CommentRepository;
import dev.wafik.blog.services.CurrentUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    final CurrentUserService currentUserService = new CurrentUserService();

    @Autowired
    private CommentRepository comments;
}
