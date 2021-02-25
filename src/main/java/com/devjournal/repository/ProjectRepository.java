package com.devjournal.repository;

import com.devjournal.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@PreAuthorize("isFullyAuthenticated()")
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
    @Override
    @PostFilter("filterObject.owner.login == principal.username")
    Iterable<Project> findAll(Sort sort);

    @Override
    @Query("select o from Project o where o.owner.login = ?#{principal.username}")
    Page<Project> findAll(Pageable pageable);

    @Override
    @Query("select o from Project o where o.id = ?1 and o.owner.login = ?#{principal.username}")
    Optional<Project> findById(Long aLong);

    @Override
    @RestResource(exported = false)
    boolean existsById(Long aLong);

    @Override
    @PostFilter("filterObject.owner.login == principal.username")
    Iterable<Project> findAll();

    @Override
    @PostFilter("filterObject.owner.login == principal.username")
    Iterable<Project> findAllById(Iterable<Long> longs);

    @Override
    @RestResource(exported = false)
    long count();

    @Override
    @PreAuthorize("@projectRepository.findById(#aLong)?.owner.login == principal.username")
    void deleteById(@Param("aLong") Long aLong);

    @Override
    @PreAuthorize("#entity.owner.login == principal.username")
    void delete(@Param("entity") Project entity);

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Project> entities);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
