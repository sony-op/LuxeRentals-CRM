document.addEventListener('DOMContentLoaded', () => {
    // ---- Navigation Logic ----
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(n => n.classList.remove('active'));
            viewSections.forEach(v => v.classList.remove('active', 'hidden'));
            
            // Hide all views
            viewSections.forEach(v => v.classList.add('hidden'));

            // Add active class to clicked
            item.classList.add('active');
            const targetId = `view-${item.dataset.target}`;
            const targetView = document.getElementById(targetId);
            
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active');
            }
        });
    });

    // ---- Data Definitions ----
    const plansData = [
        {
            id: 'plan_free',
            name: 'Starter',
            price: '$0',
            period: '/month',
            features: [
                'Up to 100 active rentals',
                'Basic CRM features',
                'Standard email support'
            ],
            isPopular: false
        },
        {
            id: 'plan_pro',
            name: 'Professional',
            price: '$49',
            period: '/month',
            features: [
                'Unlimited active rentals',
                'Advanced Calendar & Analytics',
                'Custom integrations',
                'Priority 24/7 support'
            ],
            isPopular: true
        },
        {
            id: 'plan_enterprise',
            name: 'Enterprise',
            price: '$199',
            period: '/month',
            features: [
                'Multi-location support',
                'White-label options',
                'Dedicated account manager',
                'Custom SLA & uptime'
            ],
            isPopular: false
        }
    ];

    const tenantsData = [
        { id: 1, name: 'Acme Clothing Rental', plan: 'Professional', status: 'Active', overrides: 2 },
        { id: 2, name: 'Luxe Wardrobes', plan: 'Enterprise', status: 'Active', overrides: 0 },
        { id: 3, name: 'Stitch & Co', plan: 'Starter', status: 'Active', overrides: 1 },
        { id: 4, name: 'Vintage Vault', plan: 'Starter', status: 'Inactive', overrides: 0 },
        { id: 5, name: 'Urban Threads', plan: 'Professional', status: 'Active', overrides: 3 },
    ];

    const availablePermissions = [
        { id: 'perm_analytics', label: 'Advanced Analytics', desc: 'Allow access to deeper sales insights' },
        { id: 'perm_whitelabel', label: 'White-Label Branding', desc: 'Remove system branding from frontend' },
        { id: 'perm_api', label: 'API Access', desc: 'Generate keys for external integrations' },
        { id: 'perm_multi_location', label: 'Multi-Location Inventory', desc: 'Manage stock across multiple physical stores' }
    ];

    // ---- Render Functions ----
    const renderPlans = () => {
        const container = document.getElementById('plans-container');
        if (!container) return;
        
        container.innerHTML = plansData.map(plan => `
            <div class="plan-card glass-panel" style="${plan.isPopular ? 'border: 1px solid var(--accent-purple); box-shadow: 0 0 20px rgba(139, 92, 246, 0.15)' : ''}">
                ${plan.isPopular ? '<div class="plan-badge">Most Popular</div>' : ''}
                <div class="plan-header">
                    <h2>${plan.name}</h2>
                    <div class="plan-price">${plan.price}<span class="plan-period">${plan.period}</span></div>
                </div>
                <ul class="plan-features">
                    ${plan.features.map(f => `
                        <li><span class="material-icons-outlined">check_circle</span> ${f}</li>
                    `).join('')}
                </ul>
                <button class="${plan.isPopular ? 'primary-btn' : 'secondary-btn'} full-width" style="justify-content: center;">
                    Edit Plan Configuration
                </button>
            </div>
        `).join('');
    };

    const renderPermissionsTable = () => {
        const tbody = document.getElementById('permissions-tbody');
        if (!tbody) return;

        tbody.innerHTML = tenantsData.map(tenant => `
            <tr>
                <td>
                    <strong>${tenant.name}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-muted)">ID: TEN-${tenant.id.toString().padStart(4, '0')}</div>
                </td>
                <td>
                    <span style="font-weight:600; color: ${tenant.plan === 'Enterprise' ? 'var(--accent-purple)' : tenant.plan === 'Professional' ? 'var(--accent-blue)' : 'var(--text-primary)'}">
                        ${tenant.plan}
                    </span>
                </td>
                <td>
                    <span class="status-indicator ${tenant.status === 'Active' ? 'status-active' : 'status-inactive'}">
                        <span class="material-icons-outlined" style="font-size: 14px;">
                            ${tenant.status === 'Active' ? 'check_circle' : 'cancel'}
                        </span>
                        ${tenant.status}
                    </span>
                </td>
                <td>
                    ${tenant.overrides > 0 
                        ? `<span style="background: rgba(245, 158, 11, 0.2); color: var(--warning); padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${tenant.overrides} Overrides</span>` 
                        : '<span style="color: var(--text-muted); font-size: 0.8rem;">Clean</span>'}
                </td>
                <td>
                    <button class="secondary-btn edit-tenant-btn" data-id="${tenant.id}" style="padding: 6px 12px; font-size: 0.85rem;">
                        Manage
                    </button>
                </td>
            </tr>
        `).join('');

        // Attach event listeners to new edit buttons
        document.querySelectorAll('.edit-tenant-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tenantId = parseInt(e.currentTarget.dataset.id);
                openModal(tenantId);
            });
        });
    };

    renderPlans();
    renderPermissionsTable();

    // ---- Modal Logic ----
    const modal = document.getElementById('permissions-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    const openModal = (tenantId) => {
        const tenant = tenantsData.find(t => t.id === tenantId);
        if(!tenant) return;

        document.getElementById('modal-tenant-name').textContent = tenant.name;
        
        // Populate Plan Dropdown
        const planSelect = document.getElementById('modal-plan-select');
        planSelect.value = tenant.plan; // Match logic or value mappings

        // Populate Permissions Toggles
        const permsList = document.getElementById('modal-permissions-list');
        permsList.innerHTML = availablePermissions.map((perm, index) => {
            // Randomly simulate checked state based on tenant overrides
            const isChecked = tenant.overrides > index ? 'checked' : '';
            return `
                <div class="perm-item">
                    <div class="perm-info">
                        <strong>${perm.label}</strong>
                        <span>${perm.desc}</span>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${isChecked}>
                        <span class="slider"></span>
                    </label>
                </div>
            `;
        }).join('');

        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.getElementById('save-permissions-btn')?.addEventListener('click', () => {
        // Simulate save
        const btn = document.getElementById('save-permissions-btn');
        const oldText = btn.textContent;
        btn.textContent = 'Saving...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.textContent = 'Saved!';
            btn.style.background = 'var(--success)';
            setTimeout(() => {
                closeModal();
                btn.textContent = oldText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 800);
        }, 1000);
    });

});
