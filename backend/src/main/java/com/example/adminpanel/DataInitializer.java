package com.example.adminpanel;

import com.example.adminpanel.entity.Admin;
import com.example.adminpanel.entity.NewsletterSubscriber;
import com.example.adminpanel.entity.OrderEntity;
import com.example.adminpanel.entity.OrderItem;
import com.example.adminpanel.entity.Product;
import com.example.adminpanel.entity.UserEntity;
import com.example.adminpanel.repository.AdminRepository;
import com.example.adminpanel.repository.NewsletterSubscriberRepository;
import com.example.adminpanel.repository.OrderRepository;
import com.example.adminpanel.repository.ProductRepository;
import com.example.adminpanel.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
@ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final NewsletterSubscriberRepository newsletterSubscriberRepository;
    private final PasswordEncoder passwordEncoder;
    private final String seededAdminPassword;

    public DataInitializer(
        AdminRepository adminRepository,
        UserRepository userRepository,
        ProductRepository productRepository,
        OrderRepository orderRepository,
        NewsletterSubscriberRepository newsletterSubscriberRepository,
        PasswordEncoder passwordEncoder,
        @Value("${app.seed.admin-password:ChangeMeAdmin123!}") String seededAdminPassword
    ) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.newsletterSubscriberRepository = newsletterSubscriberRepository;
        this.passwordEncoder = passwordEncoder;
        this.seededAdminPassword = seededAdminPassword;
    }

    @Override
    @Transactional
    public void run(String... args) {
        String encodedPassword = passwordEncoder.encode(seededAdminPassword);
        ensureAdmin(encodedPassword);
        seedProducts();
        seedUsers(encodedPassword);
        seedNewsletterSubscribers();
        seedOrders();
    }

    private void ensureAdmin(String encodedPassword) {
        Admin admin = adminRepository.findByUsername("admin").orElseGet(Admin::new);
        admin.setUsername("admin");
        admin.setPassword(encodedPassword);
        admin.setRole("ADMIN");
        adminRepository.save(admin);
    }

    private void seedProducts() {
        deactivateLegacyProducts(List.of(
            "Moringa Wellness Powder",
            "Cold-Pressed Groundnut Oil",
            "Turmeric Immunity Mix",
            "Traditional Idli Podi",
            "Organic Sesame Laddu Mix",
            "Millet Breakfast Pancake Mix"
        ));
        ensureProduct(
            "Rayon Kurti Set",
            "Bestselling festive look with matching dupatta and pants",
            "Fashion",
            "Deal of the Day",
            "1199.00",
            38,
            1,
            true,
            true,
            true,
            "Saanvi Studio",
            "Set of 3",
            "Printed rayon kurti set designed for festive wear, daily styling, and easy repeat buying.",
            "Soft fabric feel\nSizes S to XXL\nEasy return-friendly bestseller",
            "Rayon blend kurti, pants, dupatta",
            "https://images.unsplash.com/photo-1583391733981-84955f0f2a1c?auto=format&fit=crop&w=900&q=80",
            "4.6",
            2841
        );
        ensureProduct(
            "TWS Bass Earbuds",
            "Low-latency audio with ENC calling and compact charging case",
            "Electronics",
            "Flash Deal",
            "1499.00",
            44,
            2,
            true,
            false,
            true,
            "Urban Audio",
            "1 pair",
            "Wireless earbuds tuned for bass-heavy listening, gaming mode, and quick commute use.",
            "30-hour backup\nUSB-C fast charge\nTouch controls",
            "Earbuds, case, cable, eartips",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80",
            "4.5",
            5233
        );
        ensureProduct(
            "Glow Serum Combo",
            "Vitamin C serum and hydrating gel cream in one beauty bundle",
            "Beauty",
            "Beauty Pick",
            "799.00",
            29,
            3,
            true,
            false,
            true,
            "Pure Ritual",
            "Combo of 2",
            "Skincare duo built for everyday glow routines with quick, affordable bundling value.",
            "Dermat tested\nHydration and brightening\nTravel-friendly pack",
            "Vitamin C serum, gel cream",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
            "4.7",
            1927
        );
        ensureProduct(
            "Air Fryer 4L",
            "Compact digital fryer for snacks, fries, and low-oil weekday meals",
            "Home",
            "Kitchen Upgrade",
            "3999.00",
            17,
            4,
            true,
            false,
            true,
            "Cook Craft",
            "4 litre",
            "Digital air fryer positioned as a high-intent home appliance with strong savings messaging.",
            "8 presets\nNon-stick basket\nLow-oil cooking",
            "Air fryer unit, basket, manual",
            "https://images.unsplash.com/photo-1585515656203-2e56c407f16b?auto=format&fit=crop&w=900&q=80",
            "4.5",
            1135
        );
        ensureProduct(
            "Snack Pantry Combo",
            "Roasted makhana, trail mix, and baked chips for repeat snacking",
            "Grocery",
            "Combo Saver",
            "549.00",
            31,
            5,
            false,
            false,
            true,
            "Pantry Circle",
            "Pack of 6",
            "Quick pantry refill combo built for affordable bundles and easy cart additions.",
            "Travel-friendly packs\nRepeat-buy favorite\nValue combo",
            "Roasted makhana, nuts, baked chips",
            "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80",
            "4.6",
            1463
        );
        ensureProduct(
            "Kids Learning Kit",
            "Flash cards, activity boards, and sorting games in one bundle",
            "Kids",
            "Parents Pick",
            "999.00",
            22,
            6,
            false,
            false,
            true,
            "Bright Trail",
            "1 kit",
            "Play-led learning bundle for gifting, at-home activity time, and school-prep purchases.",
            "Age 4 plus\nReusable activity boards\nGift-ready box",
            "Boards, flash cards, sorting pieces",
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
            "4.8",
            918
        );
    }

    private void seedUsers(String encodedPassword) {
        ensureUser("jayauser", "jaya@example.com", encodedPassword, "Jaya Kumar");
        ensureUser("madhu", "madhu@example.com", encodedPassword, "Madhu Varma");
        ensureUser("nithya", "nithya@example.com", encodedPassword, "Nithya Selvan");
    }

    private void seedNewsletterSubscribers() {
        ensureSubscriber("Aarohi", "aarohi@example.com", "Fashion");
        ensureSubscriber("Rohit", "rohit@example.com", "Electronics");
        ensureSubscriber("Megha", "megha@example.com", "Home");
    }

    private void seedOrders() {
        List<OrderEntity> existingOrders = orderRepository.findAll();
        if (!existingOrders.isEmpty()) {
            boolean changed = false;
            for (OrderEntity order : existingOrders) {
                if (order.getOrderReference() == null) {
                    order.setOrderReference("VX-SEED-" + order.getId());
                    changed = true;
                }
                if (order.getCustomerName() == null && order.getUser() != null) {
                    order.setCustomerName(order.getUser().getFullName());
                    order.setCustomerEmail(order.getUser().getEmail());
                    order.setCustomerPhone("+91 90000 00000");
                    order.setShippingAddress("Sample Marketplace Street");
                    order.setDeliveryCity("Bengaluru");
                    order.setDeliveryState("Karnataka");
                    order.setDeliveryPincode("560001");
                    order.setPaymentMethod("COD");
                    order.setSalesChannel("WEBSITE");
                    changed = true;
                }
            }
            if (changed) {
                orderRepository.saveAll(existingOrders);
            }
            return;
        }

        UserEntity jayaUser = getRequiredUser("jayauser");
        UserEntity madhuUser = getRequiredUser("madhu");
        UserEntity nithyaUser = getRequiredUser("nithya");
        Product kurtiSet = getRequiredProduct("Rayon Kurti Set");
        Product earbuds = getRequiredProduct("TWS Bass Earbuds");
        Product serumCombo = getRequiredProduct("Glow Serum Combo");
        Product airFryer = getRequiredProduct("Air Fryer 4L");
        Product snackCombo = getRequiredProduct("Snack Pantry Combo");
        Product learningKit = getRequiredProduct("Kids Learning Kit");

        orderRepository.saveAll(List.of(
            createSeedOrder(
                "VX-SEED-001",
                jayaUser,
                "PENDING",
                "Jaya Kumar",
                "jaya@example.com",
                "+91 98400 11111",
                "12 Lake View Road",
                "Pune",
                "Maharashtra",
                "411001",
                "UPI",
                "First fashion and electronics order from the new website",
                List.of(
                    createOrderItem(null, kurtiSet, 1, "1199.00"),
                    createOrderItem(null, earbuds, 1, "1499.00")
                )
            ),
            createSeedOrder(
                "VX-SEED-002",
                madhuUser,
                "PROCESSING",
                "Madhu Varma",
                "madhu@example.com",
                "+91 97900 22222",
                "44 Market Square",
                "Bengaluru",
                "Karnataka",
                "560034",
                "COD",
                "Deliver after 5 PM, call before dispatch",
                List.of(
                    createOrderItem(null, serumCombo, 1, "799.00"),
                    createOrderItem(null, snackCombo, 1, "549.00")
                )
            ),
            createSeedOrder(
                "VX-SEED-003",
                nithyaUser,
                "DELIVERED",
                "Nithya Selvan",
                "nithya@example.com",
                "+91 93600 33333",
                "7 Temple Street",
                "Jaipur",
                "Rajasthan",
                "302001",
                "Card",
                "Weekend home and kids shopping restock",
                List.of(
                    createOrderItem(null, airFryer, 1, "3999.00"),
                    createOrderItem(null, learningKit, 1, "999.00")
                )
            )
        ));
    }

    private void deactivateLegacyProducts(List<String> productNames) {
        for (String productName : productNames) {
            productRepository.findByNameIgnoreCase(productName).ifPresent(product -> {
                product.setActive(false);
                productRepository.save(product);
            });
        }
    }

    private void ensureProduct(
        String name,
        String tagline,
        String category,
        String badge,
        String price,
        int stockQuantity,
        int sortOrder,
        boolean featured,
        boolean heroProduct,
        boolean organicCertified,
        String originRegion,
        String unitLabel,
        String description,
        String benefits,
        String ingredients,
        String imageUrl,
        String rating,
        int reviewCount
    ) {
        Product product = productRepository.findByNameIgnoreCase(name).orElseGet(Product::new);
        product.setName(name);
        product.setTagline(tagline);
        product.setCategory(category);
        product.setSlug(slugify(name));
        product.setBadge(badge);
        product.setPrice(new BigDecimal(price));
        product.setStockQuantity(stockQuantity);
        product.setSortOrder(sortOrder);
        product.setFeatured(featured);
        product.setHeroProduct(heroProduct);
        product.setOrganicCertified(organicCertified);
        product.setActive(true);
        product.setOriginRegion(originRegion);
        product.setUnitLabel(unitLabel);
        product.setDescription(description);
        product.setBenefits(benefits);
        product.setIngredients(ingredients);
        product.setImageUrl(imageUrl);
        product.setRating(new BigDecimal(rating));
        product.setReviewCount(reviewCount);
        productRepository.save(product);
    }

    private void ensureUser(String username, String email, String password, String fullName) {
        UserEntity user = userRepository.findByUsername(username)
            .orElseGet(() -> new UserEntity(username, email, password, fullName));
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setFullName(fullName);
        userRepository.save(user);
    }

    private void ensureSubscriber(String firstName, String email, String interestArea) {
        NewsletterSubscriber subscriber = newsletterSubscriberRepository.findByEmailIgnoreCase(email)
            .orElseGet(NewsletterSubscriber::new);
        subscriber.setFirstName(firstName);
        subscriber.setEmail(email.toLowerCase(Locale.ROOT));
        subscriber.setInterestArea(interestArea);
        newsletterSubscriberRepository.save(subscriber);
    }

    private OrderEntity createSeedOrder(
        String orderReference,
        UserEntity user,
        String status,
        String customerName,
        String customerEmail,
        String customerPhone,
        String shippingAddress,
        String deliveryCity,
        String deliveryState,
        String deliveryPincode,
        String paymentMethod,
        String orderNotes,
        List<OrderItem> items
    ) {
        OrderEntity order = new OrderEntity();
        order.setOrderReference(orderReference);
        order.setUser(user);
        order.setStatus(status);
        order.setCustomerName(customerName);
        order.setCustomerEmail(customerEmail);
        order.setCustomerPhone(customerPhone);
        order.setShippingAddress(shippingAddress);
        order.setDeliveryCity(deliveryCity);
        order.setDeliveryState(deliveryState);
        order.setDeliveryPincode(deliveryPincode);
        order.setPaymentMethod(paymentMethod);
        order.setSalesChannel("WEBSITE");
        order.setOrderNotes(orderNotes);
        order.setItems(new ArrayList<>(items));

        BigDecimal total = items.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalPrice(total);

        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        return order;
    }

    private OrderItem createOrderItem(OrderEntity order, Product product, int quantity, String price) {
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setPrice(new BigDecimal(price));
        return item;
    }

    private UserEntity getRequiredUser(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalStateException("Seed user not found: " + username));
    }

    private Product getRequiredProduct(String name) {
        return productRepository.findByNameIgnoreCase(name)
            .orElseThrow(() -> new IllegalStateException("Seed product not found: " + name));
    }

    private String slugify(String value) {
        return value.toLowerCase(Locale.ROOT)
            .replaceAll("[^a-z0-9]+", "-")
            .replaceAll("(^-|-$)", "");
    }
}
