INSERT OR IGNORE INTO Style (id, name, cssClass, previewUrl) VALUES 
('style-1', 'Future Gradient', 'style-future', '/images/poincare/hero.jpg'),
('style-2', 'Classic Elegant', 'style-classic', '/images/poincare/detail_1.jpg'),
('style-3', 'Minimalist', 'style-minimal', '/images/poincare/detail_2.jpg');

INSERT OR IGNORE INTO User (id, username, password, role) VALUES
('user-admin', 'admin', 'password_admin', 'ADMIN'),
('user-sales', 'sales', 'password_sales', 'SALES');
