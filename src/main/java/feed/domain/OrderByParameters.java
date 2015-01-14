package feed.domain;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 */
public class OrderByParameters {

    private List<OrderByPair> orderByList = new ArrayList<>();

    public boolean add(OrderByPair orderBy) {
        if (orderBy == null || orderBy.getColumn() == null) return false;
        return this.orderByList.add(orderBy);
    }

    public boolean add(OrderByColumn column) {
        return this.add(column, null);
    }

    public boolean add(OrderByColumn column, SortDirection sortDirection) {
        if (column == null) return false;
        return this.orderByList.add(new OrderByPair(column, sortDirection));
    }

    public Iterator<OrderByPair> iterator() {
        return this.orderByList.iterator();
    }

    public class OrderByPair {

        private OrderByColumn column;
        private SortDirection sortDirection = SortDirection.ASC;

        OrderByPair(OrderByColumn column, SortDirection sortDirection) {
            this.column = column;
            this.sortDirection = (sortDirection == null) ? SortDirection.ASC : sortDirection;
        }

        public OrderByColumn getColumn() {
            return this.column;
        }

        public SortDirection getSortDirection() {
            return this.sortDirection;
        }
    }

    public enum OrderByColumn {
        TITLE("title"),
        CREATED_DATE("createdDate"),
        MODIFIED_DATE("modifiedDate");

        private String columnName;

        private OrderByColumn(String columnName) {
            this.columnName = columnName;
        }

        public String getColumnName() {
            return this.columnName;
        }
    }

    public enum SortDirection {
        ASC(1),
        DESC(-1);

        private int direction;

        private SortDirection(int direction) {
            this.direction = direction;
        }

        public int getDirection() {
            return this.direction;
        }
    }

}
