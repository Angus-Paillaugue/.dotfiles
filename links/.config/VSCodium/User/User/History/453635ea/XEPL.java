package dao;

import java.util.List;

public interface GenericDAO<T> {
  T create(T t);

  default T create(T t, int inParent) {
    return null;
  }

  T find(int id);

  void update(T t);

  default T update(T t, int inParent) {
    return null;
  }

  void delete(int id);

  List<T> findAll();
}
