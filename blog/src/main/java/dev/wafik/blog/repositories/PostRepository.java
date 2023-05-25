package dev.wafik.blog.repositories;

import dev.wafik.blog.model.Comment;
import dev.wafik.blog.model.Post;
import jakarta.validation.constraints.Size;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {
    boolean existsById(@NotNull Integer id);
    List<Post> findAllByAuthor_Id(Integer author_id);


}
