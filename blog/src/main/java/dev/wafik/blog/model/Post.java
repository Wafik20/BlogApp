package dev.wafik.blog.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User author;

    @NotNull
    @Size(min = 3, max = 50, message = "Title must be minimum 3 characters, and maximum 50 characters long")
    private String title;
    @NotNull
    @Size(min = 3, max = 500, message = "Description must be minimum 3 characters, and maximum 500 characters long")
    private String description;
    @NotNull
    @Size(min = 3, max = 5000, message = "Body must be minimum 3 characters, and maximum 50 characters long")
    private String body;
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(name = "post_status")
    private PostStatus postStatus = PostStatus.DRAFT;

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @OneToMany(mappedBy = "post",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Comment> comments;

    @Override
    public String toString(){
        return "Post{" +
                "id=" + id +
                ", author=" + author.toString() +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", body='" + body + '\'' +
                ", slug='" + slug + '\'' +
                ", postStatus=" + postStatus +
                ", createdOn=" + createdOn +
                ", updatedOn=" + updatedOn +
                ", comments=" + comments +
                '}';
    }

}
