import styles from "./css.module.css";
import { useState, useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack, IoEyeOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteButton } from "../DeleteButton/DeleteButton";

const DataTable = ({ columns, data, rowsPerPage = 10 }) => {
  console.log(data);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: null,
  });
  const [filters, setFilters] = useState({});
  const [showMobileSortModal, setShowMobileSortModal] = useState(false);
  const [tempSortConfig, setTempSortConfig] = useState({
    key: "",
    direction: null,
  });

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Global search
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Column filters
      const matchesFilters = Object.entries(filters).every(
        ([key, filterValue]) => {
          if (!filterValue) return true;
          return String(row[key])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key
          ? prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? null
            : "asc"
          : "asc",
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenMobileSort = () => {
    setTempSortConfig(sortConfig);
    setShowMobileSortModal(true);
  };

  const handleApplySort = () => {
    setSortConfig(tempSortConfig);
    setShowMobileSortModal(false);
  };

  const handleCancelSort = () => {
    setShowMobileSortModal(false);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={styles.pageButton}
        >
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <span key="dots1" className={styles.dots}>
            ...
          </span>
        );
      }
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${
            currentPage === i ? styles.active : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(
          <span key="dots2" className={styles.dots}>
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={styles.pageButton}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={styles.container}>
      <button className={styles.back_button} onClick={() => navigate(-1)}>
        <IoArrowBack />
      </button>
      <div className={styles.titleWrapper}>
        <h2>Lista de Negocios</h2>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path
                d="m21 21-4.35-4.35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar en todos los campos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.searchInput}
            />
            <button
              className={styles.mobileSortButton}
              onClick={handleOpenMobileSort}
              aria-label="Ordenar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        {/* Desktop Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>
                    <div className={styles.headerCell}>
                      <span
                        className={column.sortable ? styles.sortable : ""}
                        onClick={() =>
                          column.sortable && handleSort(column.key)
                        }
                      >
                        {column.label}
                        {column.sortable && sortConfig.key === column.key && (
                          <span className={styles.sortIcon}>
                            {sortConfig.direction === "asc"
                              ? "↑"
                              : sortConfig.direction === "desc"
                              ? "↓"
                              : "⇅"}
                          </span>
                        )}
                      </span>
                      {column.filterable && (
                        <input
                          type="text"
                          placeholder="Filtrar..."
                          value={filters[column.key] || ""}
                          onChange={(e) =>
                            handleFilterChange(column.key, e.target.value)
                          }
                          className={styles.filterInput}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.format
                        ? column.format(row[column.key])
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className={styles.mobileCards}>
          {paginatedData.map((row, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.btn_container}>
                <button
                  className={styles.btn}
                  onClick={() => navigate(`/home/negocios/detalle/${row._id}`)}
                >
                  <IoEyeOutline />
                </button>
                <button
                  className={styles.btn}
                  onClick={() => navigate(`/home/negocios/editar/${row._id}`)}
                >
                  <FiEdit />
                </button>
                <DeleteButton id={row._id} />
              </div>
              {columns.map((column) => (
                <div key={column.key} className={styles.cardRow}>
                  <span className={styles.cardLabel}>{column.label}:</span>
                  <span className={styles.cardValue}>
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.navButton}
            >
              ← Anterior
            </button>

            <div className={styles.pageNumbers}>
              {renderPaginationButtons()}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.navButton}
            >
              Siguiente →
            </button>
          </div>
        )}
        <div className={styles.info}>
          Mostrando {paginatedData.length} de {sortedData.length} resultados
          {sortedData.length !== data.length &&
            ` (filtrados de ${data.length} totales)`}
        </div>
      </div>

      {/* Mobile Sort Modal */}
      {showMobileSortModal && (
        <>
          <div className={styles.modalOverlay} onClick={handleCancelSort} />
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
                </svg>
                <span>Ordenar</span>
              </div>
              <button
                onClick={handleCancelSort}
                className={styles.modalCloseButton}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.sortSection}>
                <div className={styles.sortSectionTitle}>Campo</div>
                {columns.map((column) => (
                  <label key={column.key} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="sortKey"
                      checked={tempSortConfig.key === column.key}
                      onChange={() =>
                        setTempSortConfig((prev) => ({
                          ...prev,
                          key: column.key,
                        }))
                      }
                    />
                    <span>{column.label}</span>
                  </label>
                ))}
              </div>

              <div className={styles.sortDivider} />

              <div className={styles.sortSection}>
                <div className={styles.sortSectionTitle}>Orden</div>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="sortDirection"
                    checked={tempSortConfig.direction === "asc"}
                    onChange={() =>
                      setTempSortConfig((prev) => ({
                        ...prev,
                        direction: "asc",
                      }))
                    }
                  />
                  <span>Ascendente</span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="sortDirection"
                    checked={tempSortConfig.direction === "desc"}
                    onChange={() =>
                      setTempSortConfig((prev) => ({
                        ...prev,
                        direction: "desc",
                      }))
                    }
                  />
                  <span>Descendente</span>
                </label>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={handleCancelSort}
                className={styles.modalCancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={handleApplySort}
                className={styles.modalApplyButton}
              >
                Aplicar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
