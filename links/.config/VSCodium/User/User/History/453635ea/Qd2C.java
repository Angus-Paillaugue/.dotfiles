package dao;

import java.util.List;

public interface GenericDAO<T> {
  T create(T t);

  T find(int id);

  void update(T t);

  void delete(int id);

  List<T> findAll();
}
