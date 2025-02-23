package dao;

import java.util.List;

public interface GenericDAO<T> {
  void create(T t);

  T read(int id);

  void update(T t);

  void delete(int id);

  List<T> findAll();
}
