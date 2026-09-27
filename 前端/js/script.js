"use strict";
/* ============================================================
   临权控制台 · 应用逻辑
   ============================================================ */

/* ---------- 授权类型元信息（图标） ---------- */
const TYPE_ICONS = {
	wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1.3"/>',
	lock: '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><circle cx="12" cy="15" r="1.6"/>',
	smartlock: '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><path d="M12 14v2.5"/>',
	device: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4M11 18h2"/>',
	room: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/>',
	account: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
	meeting: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><path d="M8 14h.01M12 14h.01M16 14h.01"/>',
	printer: '<path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 17h10v4H7z"/>',
	appliance: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M12 8v2M12 14v2M8 21v-1M16 21v-1"/>',
	cloud: '<path d="M7 18a5 5 0 0 1-.5-9.98A6 6 0 0 1 18 8a4 4 0 0 1 .5 7.97"/><path d="M12 13v4M10 15l2-2 2 2"/>',
	database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
	cabinet: '<path d="M4 3h16v18H4z"/><path d="M4 9h16M9 12v6h6v-6"/><path d="M8 15h.01M16 15h.01"/>',
	garage: '<path d="M3 21h18"/><path d="M4 21V9l8-6 8 6v12"/><path d="M8 21v-6h8v6"/>',
	card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
	safe: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M12 10v3M12 16v.01"/><path d="M6 2v2M18 2v2"/>',
	camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
	monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M9 21h6M12 17v4"/><circle cx="12" cy="10.5" r="2.5"/><path d="M6.5 6.5 8 8M17.5 6.5 16 8"/>',
	charger: '<path d="M8 4v3M14 4v3M10 2h4"/><path d="M7 6h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M12 11v4"/>',
	car: '<path d="M4 16l1.5-5A2 2 0 0 1 7.4 9.5h9.2a2 2 0 0 1 1.9 1.5L20 16"/><path d="M3 16h18v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="16" r=".9"/><circle cx="16.5" cy="16" r=".9"/>',
	server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h.01M11 17.5h.01"/>',
	guest: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M16 11l2 2 3-3"/>',
	misc: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
	custom: '<path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z"/>'
};

function typeIcon(key) {
	return (TYPE_ICONS[key] || TYPE_ICONS.custom);
}

function typeLabel(key) {
	const m = {
		wifi: 'WiFi 访客',
		lock: '门锁密码',
		smartlock: '智能门锁',
		device: '设备登录',
		room: '房间通行',
		account: '软件账号',
		meeting: '会议室预约',
		printer: '打印机/办公设备',
		appliance: '智能家电',
		cloud: '邮箱/网盘',
		database: '数据库/后台系统',
		cabinet: '储物柜/快递柜',
		garage: '车库门禁',
		card: '门禁卡/电梯卡',
		safe: '保险柜',
		camera: '摄像头',
		monitor: '婴儿/宠物监控',
		charger: '充电桩/电动车',
		car: '车钥匙/远程解锁',
		server: '云主机/服务器',
		guest: '访客/临时工登记',
		misc: '其他设备',
		custom: '自定义'
	};
	return m[key] || key;
}

/* ---------- 状态 ---------- */
let authList = load();
let statusFilter = 'all',
	listKeyword = '',
	deviceLimit = '1',
	pwdLen = 8,
	pwdType = 'mix',
	extendH = 1;
let pendingId = null,
	pendingDeleteId = null;
const selectedIds = new Set();

/* ---------- 本地存储 ---------- */
function load() {
	try {
		const raw = localStorage.getItem('lq_auth_v1');
		if (raw) return JSON.parse(raw);
	} catch (e) {}
	return seedDemo();
}

function save() {
	localStorage.setItem('lq_auth_v1', JSON.stringify(authList));
}

/* ---------- 示例数据（首次运行注入，便于演示；可在控制台清空） ---------- */
function seedDemo() {
	const now = Date.now(),
		H = 3600000,
		D = 86400000;
	const mk = (typeKey, hoursAgo, durH, remark, status, dev) => {
		return {
			id: 'd' + Math.random().toString(36).slice(2, 8),
			typeKey,
			pwd: createPwd(8),
			pwdLen: 8,
			createTime: now - hoursAgo * H,
			expireTime: now - hoursAgo * H + durH * H,
			remark,
			status,
			deviceLimit: dev,
			deviceCount: Math.min(dev === 'unlimited' ? 2 : dev, 2)
		};
	};
	const list = [
		mk('wifi', 2, 24, '朋友来做客连 WiFi', 'active', 3),
		mk('lock', 5, 1, '维修师傅上门', 'active', 1),
		mk('device', 26, 72, '临时工登录办公设备', 'active', 'unlimited'),
		mk('room', 6 * 24, 24 * 7, '短租租客 · 客厅通行', 'active', 'unlimited'),
		mk('account', 30, 6, '外包设计师访问后台', 'revoked', 1),
		mk('wifi', 3 * 24, 24, '上周访客', 'expired', 1),
		mk('lock', 4 * 24, 6, '保洁阿姨', 'expired', 1),
		mk('room', 7 * 24, 24 * 3, '临时工人', 'expired', 'unlimited'),
		mk('device', 12 * 24, 24, '演示环境设备', 'revoked', 3),
		mk('wifi', 16 * 24, 24, '老同学聚会', 'expired', 3),
		mk('lock', 20 * 24, 24, '家政上门', 'expired', 1),
		mk('account', 25 * 24, 24, '实习生测试账号', 'expired', 1),
		mk('wifi', 32 * 24, 24, '快递代收人员', 'expired', 1),
		mk('device', 38 * 24, 72, '备用机授权', 'expired', 1),
		mk('room', 45 * 24, 24 * 2, '民宿短租', 'expired', 'unlimited'),
		mk('account', 52 * 24, 24, '旧项目协作', 'expired', 3),
		mk('wifi', 60 * 24, 24, '租房前租客', 'expired', 1),
		mk('device', 72 * 24, 24, '历史设备', 'revoked', 3),
		mk('wifi', 85 * 24, 24, '社区活动', 'expired', 'unlimited'),
		mk('lock', 95 * 24, 24, '临时钥匙', 'expired', 1),
		mk('account', 110 * 24, 24, '顾问账号', 'expired', 3),
		mk('wifi', 130 * 24, 24, '旧访客', 'expired', 1),
		mk('room', 150 * 24, 24, '历史房间', 'expired', 'unlimited'),
		mk('device', 170 * 24, 24, '历史设备 B', 'expired', 1)
	];
	// 保持 createTime 落在近 6 个月
	return list;
}

/* ---------- 工具 ---------- */
function createPwd(len, type) {
	len = len || 8;
	type = type || 'mix';
	const SETS = {
		digit: '0123456789',
		letter: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz',
		mix: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789',
		strong: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#%^&*()-_=+[]<>?'
	};
	const str = SETS[type] || SETS.mix;
	let out = '';
	for (let i = 0; i < len; i++) out += str[Math.floor(Math.random() * str.length)];
	return out;
}

function fmtTime(ts) {
	const d = new Date(ts),
		p = n => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
/* 人类可读时长 */
function fmtDuration(ms) {
	const d = ms / 86400000,
		h = ms / 3600000,
		m = ms / 60000;
	if (ms >= 86400000) {
		const v = Math.round(d * 10) / 10;
		return (v === Math.floor(v) ? v : v) + ' 天';
	}
	if (ms >= 3600000) {
		const v = Math.round(h * 10) / 10;
		return (v === Math.floor(v) ? v : v) + ' 小时';
	}
	return Math.round(m) + ' 分钟';
}

function statusMeta(st) {
	if (st === 'active') return {
		text: '生效中',
		cls: 'badge-active',
		bar: 'st-active'
	};
	if (st === 'expired') return {
		text: '已过期',
		cls: 'badge-expired',
		bar: 'st-expired'
	};
	return {
		text: '已吊销',
		cls: 'badge-revoked',
		bar: 'st-revoked'
	};
}

function cdText(remainMs) {
	if (remainMs <= 0) return '00:00:00';
	const s = Math.floor(remainMs / 1000),
		h = Math.floor(s / 3600),
		m = Math.floor(s % 3600 / 60),
		sec = s % 60;
	const p = n => String(n).padStart(2, '0');
	return h > 0 ? `${h}h ${p(m)}m ${p(sec)}s` : `${p(m)}:${p(sec)}`;
}

function cdClass(remainMs) {
	if (remainMs <= 0) return 'danger';
	if (remainMs < 3600000) return 'warn';
	return 'ok';
}

function isToday(ts) {
	const d = new Date(ts),
		n = new Date();
	return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}

/* 自动判定过期 */
function refreshStatus() {
	const now = Date.now();
	let changed = false;
	authList.forEach(it => {
		if (it.status === 'active' && now > it.expireTime) {
			it.status = 'expired';
			changed = true;
		}
	});
	if (changed) save();
}

/* ---------- 路由 ---------- */
const VIEWS = ['dashboard', 'create', 'list', 'stats', 'devices', 'export'];

function route() {
	const h = location.hash.replace(/^#\/?/, '') || 'dashboard';
	const view = VIEWS.includes(h) ? h : 'dashboard';
	document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
	const el = document.getElementById('view-' + view);
	if (el) el.classList.add('active');
	document.querySelectorAll('.nav-item').forEach(a => {
		a.classList.toggle('active', a.dataset.view === view);
	});
	document.getElementById('sidebar').classList.remove('open');
	document.getElementById('mask').classList.remove('show');
	window.scrollTo(0, 0);
	// 按页渲染
	if (view === 'dashboard') renderDashboard();
	else if (view === 'list') renderList();
	else if (view === 'stats') renderStats();
	if (view === 'stats') {
		requestAnimationFrame(() => {
			resizeCharts();
		});
	}
}
window.addEventListener('hashchange', route);

/* ---------- Toast ---------- */
function toast(msg, type) {
	type = type || 'success';
	const icons = {
		success: '<path d="M20 6 9 17l-5-5"/>',
		error: '<path d="M18 6 6 18M6 6l12 12"/>',
		info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 12v4"/>',
		warn: '<path d="M12 9v4M12 17h.01M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/>'
	};
	const box = document.getElementById('toastBox');
	const t = document.createElement('div');
	t.className = 'toast ' + type;
	t.innerHTML =
		`<span class="t-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icons[type]}</svg></span><span>${msg}</span>`;
	box.appendChild(t);
	requestAnimationFrame(() => t.classList.add('show'));
	setTimeout(() => {
		t.classList.remove('show');
		setTimeout(() => t.remove(), 300);
	}, 2600);
}

/* ---------- 复制 / 分享 ---------- */
async function copyText(txt, label) {
	try {
		await navigator.clipboard.writeText(txt);
		toast((label || '密码') + '已复制到剪贴板');
	} catch (e) {
		const ta = document.createElement('textarea');
		ta.value = txt;
		document.body.appendChild(ta);
		ta.select();
		try {
			document.execCommand('copy');
			toast((label || '密码') + '已复制到剪贴板');
		} catch (_) {
			toast('复制失败，请手动复制', 'error');
		}
		ta.remove();
	}
}
async function shareAuth(id) {
	const it = authList.find(x => x.id === id);
	if (!it) return;
	const text =
		`【临时授权】类型：${typeLabel(it.typeKey)}${it.typeKey==='custom'?'('+it.type+' )':''}｜临时凭证：${it.pwd}｜有效至：${fmtTime(it.expireTime)}`;
	if (navigator.share) {
		try {
			await navigator.share({
				text
			});
			toast('已调起分享');
		} catch (_) {}
	} else {
		copyText(text, '授权信息');
	}
}

/* ============================================================
   配额 / 会员
   ============================================================ */
const QUOTA_LIMIT = 5,
	PRO_KEY = 'lq_pro';

function isPro() {
	return localStorage.getItem(PRO_KEY) === '1';
}

function quotaLimit() {
	return isPro() ? Infinity : QUOTA_LIMIT;
}

function quotaUsed() {
	return authList.filter(x => x.status === 'active').length;
}

/* 渲染配额条与会员卡状态 */
function renderVip() {
	const pro = isPro();
	const qu = quotaUsed();
	document.getElementById('quotaUsed').textContent = qu;
	document.getElementById('quotaTotal').textContent = pro ? '∞' : QUOTA_LIMIT;
	const vt = document.querySelector('.vip .vip-title');
	const vd = document.querySelector('.vip .vip-desc');
	const vb = document.querySelector('.vip-btn');
	if (pro) {
		document.querySelector('.quota .q-t').textContent = '临权 Pro · 无限授权';
		document.querySelector('.quota .q-s').textContent = '已解锁全部功能，可无限创建有效授权';
		document.getElementById('quotaBar').style.width = '100%';
		document.getElementById('quotaBar2').style.width = '100%';
		if (vt) vt.replaceChild(document.createTextNode(' 临权 Pro · 已解锁'), vt.lastChild);
		if (vd) vd.textContent = '无限授权 · 批量管理 · 数据导出';
		if (vb) vb.textContent = '已是 Pro 会员';
	} else {
		document.querySelector('.quota .q-t').textContent = '免费版配额';
		document.querySelector('.quota .q-s').textContent = '当前有效授权占用免费额度，升级 Pro 解锁无限授权';
		const pct = Math.min(100, Math.round(qu / QUOTA_LIMIT * 100));
		document.getElementById('quotaBar').style.width = pct + '%';
		document.getElementById('quotaBar2').style.width = pct + '%';
		if (vt) vt.replaceChild(document.createTextNode(' 临权 Pro 会员'), vt.lastChild);
		if (vd) vd.textContent = '解锁无限授权 · 批量管理 · 数据导出';
		if (vb) vb.textContent = '升级会员';
	}
}

/* ============================================================
   仪表盘
   ============================================================ */
function renderDashboard() {
	refreshStatus();
	const now = Date.now();
	const active = authList.filter(x => x.status === 'active').length;
	const expired = authList.filter(x => x.status === 'expired').length;
	const today = authList.filter(x => isToday(x.createTime)).length;
	document.getElementById('statActive').textContent = active;
	document.getElementById('statToday').textContent = today;
	document.getElementById('statExpired').textContent = expired;
	renderVip();
	document.getElementById('navListCount').textContent = authList.length;
	document.getElementById('dashDate').textContent = new Date().toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	}) + ' · 实时安全态势';

	// 最近记录（生效中优先，最多6条）
	const sorted = [...authList].sort((a, b) => {
		if (a.status === 'active' && b.status !== 'active') return -1;
		if (a.status !== 'active' && b.status === 'active') return 1;
		return a.expireTime - b.expireTime;
	});
	const recent = sorted.slice(0, 6);
	const wrap = document.getElementById('recentList');
	wrap.innerHTML = '';
	if (!recent.length) {
		wrap.innerHTML = '<div class="empty" style="padding:34px"><div class="e-s">暂无授权记录，点击右上角「新建授权」开始</div></div>';
		return;
	}
	recent.forEach(it => {
		const sm = statusMeta(it.status);
		const remain = it.expireTime - now;
		let cdHtml;
		if (it.status === 'active') cdHtml = `<span class="cd ${cdClass(remain)}">${cdText(remain)}</span>`;
		else cdHtml = `<span class="cd" style="color:var(--txt3)">--:--:--</span>`;
		const div = document.createElement('div');
		div.className = 'recent-item';
		div.innerHTML = `
      <div class="type-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${typeIcon(it.typeKey)}</svg></div>
      <div class="meta"><div class="t">${it.typeKey==='custom'?it.type:typeLabel(it.typeKey)} · ${it.pwd}</div><div class="r">${it.remark||'未备注'}</div></div>
      ${cdHtml}
      <span class="st ${sm.cls}">${sm.text}</span>`;
		wrap.appendChild(div);
	});
}

/* ============================================================
   新建授权
   ============================================================ */
function setupCreateControls() {
	const typeSel = document.getElementById('fType'),
		tCustom = document.getElementById('fTypeCustom');
	const expSel = document.getElementById('fExpire'),
		eCustom = document.getElementById('fExpireCustom');

	function syncType() {
		tCustom.classList.toggle('show', typeSel.value === 'custom');
	}

	function syncExp() {
		eCustom.classList.toggle('show', expSel.value === 'custom');
	}
	typeSel.addEventListener('change', syncType);
	expSel.addEventListener('change', syncExp);
	syncType();
	syncExp();

	document.querySelectorAll('#fDeviceChips .chip').forEach(c => {
		c.addEventListener('click', () => {
			document.querySelectorAll('#fDeviceChips .chip').forEach(x => x.classList.remove('sel'));
			c.classList.add('sel');
			deviceLimit = c.dataset.dev;
			document.getElementById('fDeviceCustom').classList.toggle('show', deviceLimit === 'custom');
		});
	});
	document.querySelectorAll('#fPwdChips .chip').forEach(c => {
		c.addEventListener('click', () => {
			document.querySelectorAll('#fPwdChips .chip').forEach(x => x.classList.remove('sel'));
			c.classList.add('sel');
			pwdLen = c.dataset.len === 'custom' ? 'custom' : Number(c.dataset.len);
			document.getElementById('fPwdCustom').classList.toggle('show', pwdLen === 'custom');
		});
	});
	document.querySelectorAll('#fPwdTypeChips .chip').forEach(c => {
		c.addEventListener('click', () => {
			document.querySelectorAll('#fPwdTypeChips .chip').forEach(x => x.classList.remove('sel'));
			c.classList.add('sel');
			pwdType = c.dataset.ptype;
		});
	});


	document.getElementById('createBtn').addEventListener('click', createAuth);
}

function resolveDurationMs() {
	const v = document.getElementById('fExpire').value;
	if (v !== 'custom') {
		return Number(v) * 60000; // 预设值以「分钟」为单位
	}
	const val = parseFloat(document.getElementById('fExpireVal').value);
	const unit = Number(document.getElementById('fExpireUnit').value);
	if (!val || val <= 0) {
		toast('请输入有效的自定义时长', 'warn');
		return null;
	}
	return val * unit * 1000;
}

function resolveDeviceLimit() {
	if (deviceLimit !== 'custom') return deviceLimit;
	const n = Number(document.getElementById('fDeviceCustomVal').value.trim());
	if (!Number.isInteger(n) || n < 1 || n > 99) {
		toast('请输入 1-99 之间的设备数量', 'warn');
		return null;
	}
	return n;
}

function resolvePwdLen() {
	if (pwdLen !== 'custom') return pwdLen;
	const n = Number(document.getElementById('fPwdCustomVal').value.trim());
	if (!Number.isInteger(n) || n < 4 || n > 32) {
		toast('请输入 4-32 之间的密码位数', 'warn');
		return null;
	}
	return n;
}

function createAuth() {
	// 免费版配额校验
	if (!isPro() && quotaUsed() >= QUOTA_LIMIT) {
		toast('已达免费版 ' + QUOTA_LIMIT + ' 条有效授权上限，请先吊销/删除部分授权，或升级 Pro', 'warn');
		return;
	}
	const typeKey = document.getElementById('fType').value;
	let type = typeLabel(typeKey);
	if (typeKey === 'custom') {
		const cv = document.getElementById('fTypeCustomVal').value.trim();
		if (!cv) {
			toast('请输入自定义授权类型名称', 'warn');
			document.getElementById('fTypeCustomVal').focus();
			return;
		}
		type = cv;
	}
	const durMs = resolveDurationMs();
	if (durMs === null) return;
	const dev = resolveDeviceLimit();
	if (dev === null) return;
	const len = resolvePwdLen();
	if (len === null) return;
	const remark = document.getElementById('fRemark').value.trim();
	const now = Date.now();
	const item = {
		id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
		typeKey,
		type,
		pwd: createPwd(len, pwdType),
		pwdLen: len,
		createTime: now,
		expireTime: now + durMs,
		remark,
		status: 'active',
		deviceLimit: dev,
		deviceCount: 0
	};
	authList.push(item);
	save();
	renderPreview(item);
	toast('临时凭证已生成，请及时复制分享');
	document.getElementById('fRemark').value = '';
}

function renderPreview(it) {
	const box = document.getElementById('genResult');
	const durTxt = fmtDuration(it.expireTime - it.createTime);
	box.innerHTML = `
    <div class="gen-result">
      <div class="pwd-display">${it.pwd}</div>
      <div class="gen-meta">
        <div class="gm"><div class="k">授权类型</div><div class="v">${typeLabel(it.typeKey)}${it.typeKey==='custom'?'（'+it.type+'）':''}</div></div>
        <div class="gm"><div class="k">有效时长</div><div class="v unit">${durTxt}</div></div>
        <div class="gm"><div class="k">允许设备</div><div class="v">${it.deviceLimit==='unlimited'?'不限':it.deviceLimit+' 台'}</div></div>
        <div class="gm"><div class="k">到期时间</div><div class="v">${fmtTime(it.expireTime)}</div></div>
      </div>
      <div class="gen-actions">
        <button class="top-btn" onclick="copyText('${it.pwd}','密码')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>复制密码</button>
        <button class="top-btn" onclick="shareAuth('${it.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>分享凭证</button>
      </div>
    </div>`;
}

/* ============================================================
   授权管理列表
   ============================================================ */
function renderList() {
	refreshStatus();
	const now = Date.now();
	const seg = document.querySelectorAll('#statusSeg button');
	seg.forEach(b => b.classList.toggle('sel', b.dataset.st === statusFilter));
	document.getElementById('navListCount').textContent = authList.length;

	let items = authList;
	if (statusFilter !== 'all') items = items.filter(x => x.status === statusFilter);
	if (listKeyword) {
		const kw = listKeyword.toLowerCase();
		items = items.filter(x => {
			const label = x.typeKey === 'custom' ? x.type : x.typeKey + ' ' + typeLabel(x.typeKey);
			return (x.type || '').toLowerCase().includes(kw) || (x.remark || '').toLowerCase().includes(kw) || x
				.pwd.toLowerCase().includes(kw) || label.toLowerCase().includes(kw);
		});
	}
	// 生效中在前
	items = [...items].sort((a, b) => {
		if (a.status === 'active' && b.status !== 'active') return -1;
		if (a.status !== 'active' && b.status === 'active') return 1;
		return b.createTime - a.createTime;
	});

	const wrap = document.getElementById('listWrap');
	if (!items.length) {
		wrap.innerHTML =
			`<div class="empty"><div class="e-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></div><div class="e-t">${authList.length?'没有匹配的记录':'还没有授权记录'}</div><div class="e-s">${authList.length?'换个筛选条件试试':'点击「新建授权」生成第一条临时凭证'}</div>${authList.length?'':'<button class="top-btn primary" onclick="location.hash=\'#/create\'">去新建授权</button>'}</div>`;
		return;
	}
	wrap.innerHTML = '';
	items.forEach(it => {
		const sm = statusMeta(it.status);
		const remain = it.expireTime - now;
		const card = document.createElement('div');
		card.className = 'auth-card ' + sm.bar + (selectedIds.has(it.id) ? ' selected' : '');
		let cdCell;
		if (it.status === 'active') cdCell =
			`<span class="cd-count ${cdClass(remain)}">${cdText(remain)}</span>`;
		else cdCell = `<span class="cd-count" style="color:var(--txt3)">已结束</span>`;
		const devTxt = it.deviceLimit === 'unlimited' ? '不限' : '限 ' + it.deviceLimit + ' 台';
		const devUsed =
			`<small>${it.deviceCount} / ${it.deviceLimit==='unlimited'?'∞':it.deviceLimit} 台</small>`;
		card.innerHTML = `
      <div class="ac-head">
        <input type="checkbox" class="card-check" data-id="${it.id}" ${selectedIds.has(it.id) ? 'checked' : ''}>
        <div class="ac-type"><span class="type-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${typeIcon(it.typeKey)}</svg></span>${it.typeKey==='custom'?it.type:typeLabel(it.typeKey)}</div>
        <div class="ac-status"><span class="st ${sm.cls}">${sm.text}</span></div>
      </div>
      <div class="ac-body">
        <div class="ac-cell"><div class="k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><circle cx="12" cy="15" r="1.6"/></svg>临时凭证</div><div class="v mono">${it.pwd}</div></div>
        <div class="ac-cell"><div class="k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>创建时间</div><div class="v">${fmtTime(it.createTime)}</div></div>
        <div class="ac-cell"><div class="k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18"/></svg>剩余时间</div><div class="v">${cdCell}</div></div>
        <div class="ac-cell"><div class="k"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4M11 18h2"/></svg>绑定设备</div><div class="v">${devTxt} ${devUsed}</div></div>
      </div>
      <div class="ac-actions">
        ${it.status==='active'?`<button class="mini-btn danger" onclick="revokeAuth('${it.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h8M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/></svg>提前吊销</button>`:''}
        ${it.status!=='revoked'?`<button class="mini-btn" onclick="openExtend('${it.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>延期</button>`:''}
        <button class="mini-btn" onclick="copyText('${it.pwd}','密码')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>复制</button>
        <button class="mini-btn" onclick="shareAuth('${it.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>分享</button>
        <button class="mini-btn ghost-danger" style="margin-left:auto" onclick="openDelete('${it.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>删除</button>
      </div>`;
		wrap.appendChild(card);
		const cb = card.querySelector('.card-check');
		cb.addEventListener('change', () => {
			if (cb.checked) selectedIds.add(it.id);
			else selectedIds.delete(it.id);
			card.classList.toggle('selected', cb.checked);
			updateBatchBar(items.length);
		});
	});
	updateBatchBar(items.length);
}

/* ---------- 吊销 / 延期 / 删除 ---------- */
window.revokeAuth = function(id) {
	const it = authList.find(x => x.id === id);
	if (!it) return;
	it.status = 'revoked';
	save();
	renderList();
	renderDashboard();
	toast('已手动吊销该临时凭证');
};

function openExtend(id) {
	pendingId = id;
	const it = authList.find(x => x.id === id);
	if (!it) return;
	document.getElementById('extendSub').innerHTML = it.status === 'expired' ?
		'该授权已过期，延期后将重新生效' :
		`为「${it.typeKey==='custom'?it.type:typeLabel(it.typeKey)}」追加有效时长`;
	extendH = 1;
	document.querySelectorAll('#extendChips .chip').forEach(c => c.classList.toggle('sel', Number(c.dataset.h) === 1));
	openModal('extendModal');
}
document.querySelectorAll('#extendChips .chip').forEach(c => {
	c.addEventListener('click', () => {
		document.querySelectorAll('#extendChips .chip').forEach(x => x.classList.remove('sel'));
		c.classList.add('sel');
		extendH = Number(c.dataset.h);
	});
});
document.getElementById('extendOk').addEventListener('click', () => {
	const it = authList.find(x => x.id === pendingId);
	if (!it) return;
	const addMs = extendH * 3600000;
	const base = Math.max(it.expireTime, Date.now());
	it.expireTime = base + addMs;
	if (it.status === 'expired') it.status = 'active';
	save();
	closeModal('extendModal');
	renderList();
	renderDashboard();
	toast(`已延期 ${fmtDuration(addMs)}`);
});

function openDelete(id) {
	pendingDeleteId = id;
	openModal('delModal');
}
document.getElementById('delOk').addEventListener('click', () => {
	const idx = authList.findIndex(x => x.id === pendingDeleteId);
	if (idx > -1) {
		authList.splice(idx, 1);
		selectedIds.delete(pendingDeleteId);
		save();
	}
	closeModal('delModal');
	renderList();
	renderDashboard();
	toast('授权记录已删除', 'info');
});

/* ---------- 筛选 ---------- */
document.querySelectorAll('#statusSeg button').forEach(b => {
	b.addEventListener('click', () => {
		statusFilter = b.dataset.st;
		renderList();
	});
});
document.getElementById('listSearch').addEventListener('input', e => {
	listKeyword = e.target.value;
	renderList();
});

/* ============================================================
   数据统计
   ============================================================ */
let charts = {};

function initCharts() {
	try {
		if (typeof echarts === 'undefined') return;
		charts.trend = echarts.init(document.getElementById('chartTrend'));
		charts.type = echarts.init(document.getElementById('chartType'));
		window.addEventListener('resize', resizeCharts);
	} catch (e) {
		console.warn('图表初始化跳过：', e && e.message);
	}
}

function resizeCharts() {
	Object.values(charts).forEach(c => c && c.resize());
}

function renderStats() {
	refreshStatus();
	const now = Date.now();
	document.getElementById('kTotal').textContent = authList.length;
	document.getElementById('kRevoke').textContent = authList.filter(x => x.status === 'revoked').length;
	const avg = authList.length ? Math.round(authList.reduce((s, x) => (x.expireTime - x.createTime) / 3600000, 0) /
		authList.length) : 0;
	document.getElementById('kAvg').textContent = avg;

	// 近6个月趋势 + 类型分布（图表组件未就绪时跳过）
	if (charts.trend && charts.type) {
		const months = [];
		const nowD = new Date();
		for (let i = 5; i >= 0; i--) {
			const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1);
			months.push({
				key: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`,
				label: `${d.getMonth()+1}月`,
				count: 0
			});
		}
		authList.forEach(it => {
			const d = new Date(it.createTime);
			const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
			const m = months.find(x => x.key === key);
			if (m) m.count++;
		});
		const trendOpt = {
			grid: {
				left: 44,
				right: 16,
				top: 26,
				bottom: 30
			},
			tooltip: {
				trigger: 'axis',
				backgroundColor: '#16203a',
				borderColor: 'rgba(151,167,209,.25)',
				textStyle: {
					color: '#EAF0FB'
				}
			},
			xAxis: {
				type: 'category',
				data: months.map(m => m.label),
				axisLine: {
					lineStyle: {
						color: 'rgba(151,167,209,.2)'
					}
				},
				axisLabel: {
					color: '#9DAACA'
				}
			},
			yAxis: {
				type: 'value',
				minInterval: 1,
				splitLine: {
					lineStyle: {
						color: 'rgba(151,167,209,.08)'
					}
				},
				axisLabel: {
					color: '#9DAACA'
				}
			},
			series: [{
				name: '授权数',
				type: 'bar',
				data: months.map(m => m.count),
				barWidth: 26,
				itemStyle: {
					borderRadius: [7, 7, 0, 0],
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#3D8BFF'
					}, {
						offset: 1,
						color: '#2FE0CB'
					}])
				},
				label: {
					show: true,
					position: 'top',
					color: '#9DAACA',
					fontSize: 12
				}
			}]
		};
		charts.trend.setOption(trendOpt);

		const tcount = {};
		authList.forEach(it => {
			const k = it.typeKey === 'custom' ? ('自定义·' + it.type) : typeLabel(it.typeKey);
			tcount[k] = (tcount[k] || 0) + 1;
		});
		const pieData = Object.entries(tcount).map(([name, value]) => ({
			name,
			value
		}));
		const palette = ['#3D8BFF', '#2FE0CB', '#E4B95B', '#8f7bff', '#f78a6b', '#6bdcab', '#9DAACA'];
		const pieOpt = {
			tooltip: {
				trigger: 'item',
				backgroundColor: '#16203a',
				borderColor: 'rgba(151,167,209,.25)',
				textStyle: {
					color: '#EAF0FB'
				}
			},
			legend: {
				bottom: 0,
				textStyle: {
					color: '#9DAACA'
				},
				type: 'scroll'
			},
			series: [{
				type: 'pie',
				radius: ['44%', '70%'],
				center: ['50%', '44%'],
				itemStyle: {
					borderColor: '#0d1526',
					borderWidth: 2,
					borderRadius: 6
				},
				label: {
					color: '#9DAACA',
					fontSize: 12
				},
				data: pieData.map((d, i) => ({
					...d,
					itemStyle: {
						color: palette[i % palette.length]
					}
				}))
			}]
		};
		charts.type.setOption(pieOpt);
	}

	// 风险提示
	const risks = [];
	// 频繁授权
	const freq = authList.filter(it => {
		const d = new Date(it.createTime),
			n = new Date();
		return isToday(d) && d.getFullYear() === n.getFullYear();
	}).length;
	if (freq >= 3) risks.push({
		lv: '中',
		lvCls: 'bg:rgba(228,185,91,.16);color:#f0cf8d',
		t: '今日授权较频繁',
		d: `今日已生成 ${freq} 条授权，建议核对用途`
	});
	else risks.push({
		lv: '正常',
		lvCls: 'background:rgba(63,208,138,.14);color:#6bdcab',
		t: '今日授权频率正常',
		d: `今日已生成 ${freq} 条授权`
	});
	// 长期授权
	const long = authList.filter(x => x.status === 'active' && (x.expireTime - x.createTime) >= 7 * 86400000).length;
	if (long > 0) risks.push({
		lv: '提示',
		lvCls: 'background:rgba(61,139,255,.16);color:#8db6ff',
		t: '存在长期授权',
		d: `${long} 条授权有效期 ≥ 7 天，建议到期后手动回收`
	});
	else risks.push({
		lv: '正常',
		lvCls: 'background:rgba(63,208,138,.14);color:#6bdcab',
		t: '无长期授权',
		d: '暂无有效期 ≥ 7 天的长期授权'
	});
	// 主动吊销率
	const rev = authList.filter(x => x.status === 'revoked').length;
	const rate = authList.length ? Math.round(rev / authList.length * 100) : 0;
	if (rate > 15) risks.push({
		lv: '注意',
		lvCls: 'background:rgba(243,107,107,.16);color:#f79a9a',
		t: '主动吊销比例偏高',
		d: `吊销率 ${rate}%，权限回收意识良好但授权需更精准`
	});
	else risks.push({
		lv: '良好',
		lvCls: 'background:rgba(63,208,138,.14);color:#6bdcab',
		t: '权限回收情况良好',
		d: `吊销率 ${rate}%，授权生命周期健康`
	});
	const rl = document.getElementById('riskList');
	rl.innerHTML = risks.map(r => `
    <div class="risk-item">
      <div class="r-ico" style="${r.lvCls}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z"/></svg></div>
      <div><div class="r-t">${r.t}</div><div class="r-d">${r.d}</div></div>
      <span class="r-lv" style="${r.lvCls}">${r.lv}</span>
    </div>`).join('');
}

/* ============================================================
   弹窗控制
   ============================================================ */
function openModal(id) {
	document.getElementById(id).classList.add('show');
	document.getElementById('mask').classList.add('show');
}

function closeModal(id) {
	document.getElementById(id).classList.remove('show');
	if (!document.querySelector('.modal.show')) document.getElementById('mask').classList.remove('show');
}
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => {
	if (e.target === m) closeModal(m.id);
}));
document.querySelectorAll('.modal .btn-ghost').forEach(b => b.addEventListener('click', () => closeModal(b.closest(
	'.modal').id)));

/* ============================================================
   全局交互
   ============================================================ */
document.getElementById('hamburger').addEventListener('click', () => {
	document.getElementById('sidebar').classList.add('open');
	document.getElementById('mask').classList.add('show');
});
document.getElementById('mask').addEventListener('click', () => {
	document.getElementById('sidebar').classList.remove('open');
	document.getElementById('mask').classList.remove('show');
});
document.getElementById('quickCreate').addEventListener('click', () => location.hash = '#/create');
document.getElementById('vipBtn').addEventListener('click', () => {
	if (isPro()) {
		toast('您已是 Pro 会员', 'info');
		return;
	}
	localStorage.setItem(PRO_KEY, '1');
	renderVip();
	renderDashboard();
	toast('已解锁 Pro（演示环境）');
});
document.getElementById('exportBtn').addEventListener('click', () => toast('记录导出为二期功能，暂未开放', 'info'));
document.getElementById('globalSearch').addEventListener('input', e => {
	const kw = e.target.value.trim();
	if (!kw) {
		if (listKeyword) listKeyword = '';
		renderList();
		return;
	}
	statusFilter = 'all';
	listKeyword = kw;
	document.querySelectorAll('#statusSeg button').forEach(b => b.classList.toggle('sel', b.dataset.st ===
		'all'));
	location.hash = '#/list';
	renderList();
});

// 页面关闭前兜底保存
window.addEventListener('beforeunload', save);

/* 定时刷新倒计时（仪表盘 + 列表） */
setInterval(() => {
	renderDashboard();
}, 1000);
setInterval(() => {
	if (location.hash.includes('list')) renderList();
}, 1000);

/* ============================================================
   登录模块（手机号 / 微信扫码）
   ============================================================ */
const SESSION_KEY = 'lq_session';

function isLoggedIn() {
	return !!localStorage.getItem(SESSION_KEY);
}

function session() {
	try {
		return JSON.parse(localStorage.getItem(SESSION_KEY)) || {};
	} catch (e) {
		return {};
	}
}

function maskPhone(p) {
	return p ? p.slice(0, 3) + '****' + p.slice(-4) : '微信用户';
}

function updateFootUser() {
	const s = session();
	let name, role, av;
	if (s.method === 'phone' && s.phone) {
		name = maskPhone(s.phone);
		role = '手机号登录 · 账户中心';
		av = s.phone.charAt(0);
	} else {
		name = '微信用户';
		role = '微信登录 · 账户中心';
		av = '微';
	}
	document.getElementById('footName').textContent = name;
	document.getElementById('footRole').textContent = role;
	document.getElementById('footAvatar').textContent = av;
}

function renderQR() {
	const img = document.getElementById('qrImg');
	if (img.dataset.done) return;
	const url = 'https://lq.example.com/wechat/oauth?scope=snsapi_login&ts=' + Date.now();
	if (typeof QRCode === 'undefined') {
		img.outerHTML = '<div class="qr-loading">二维码加载失败</div>';
		return;
	}
	QRCode.toDataURL(url, {
		margin: 1,
		width: 160,
		color: {
			dark: '#0a0f1e',
			light: '#ffffff'
		}
	}, function(err, dataUrl) {
		if (err) {
			img.outerHTML = '<div class="qr-loading">二维码生成失败</div>';
			return;
		}
		img.src = dataUrl;
		img.dataset.done = '1';
	});
}

function doLogin(method, phone) {
	localStorage.setItem(SESSION_KEY, JSON.stringify({
		method: method,
		phone: phone || '',
		time: Date.now()
	}));
	document.getElementById('loginScreen').classList.add('hidden');
	document.querySelector('.app').classList.remove('hidden');
	updateFootUser();
	toast('登录成功，欢迎回来');
}

function initAuth() {
	const screen = document.getElementById('loginScreen');
	const app = document.querySelector('.app');
	if (isLoggedIn()) {
		screen.classList.add('hidden');
		updateFootUser();
	} else {
		screen.classList.remove('hidden');
		app.classList.add('hidden');
	}

	// 登录方式 Tab 切换
	document.querySelectorAll('.login-tabs button').forEach(b => {
		b.addEventListener('click', () => {
			document.querySelectorAll('.login-tabs button').forEach(x => x.classList.remove('sel'));
			b.classList.add('sel');
			const target = b.dataset.ltab;
			document.getElementById('ltab-phone').style.display = target === 'phone' ? 'block' : 'none';
			document.getElementById('ltab-wechat').style.display = target === 'wechat' ? 'block' :
				'none';
			if (target === 'wechat') renderQR();
		});
	});

	// 协议占位
	document.querySelectorAll('.agree a').forEach(a => {
		a.addEventListener('click', e => {
			e.preventDefault();
			toast('《用户协议》与《隐私政策》将在正式版展示', 'info');
		});
	});

	// 获取验证码（演示：验证码固定 123456，60s 倒计时）
	let codeTimer = null,
		codeCount = 0;
	document.getElementById('getCodeBtn').addEventListener('click', () => {
		const phone = document.getElementById('loginPhone').value.trim();
		if (!/^1\d{10}$/.test(phone)) {
			toast('请输入正确的 11 位手机号', 'warn');
			return;
		}
		if (codeCount > 0) return;
		const btn = document.getElementById('getCodeBtn');
		codeCount = 60;
		btn.disabled = true;
		btn.textContent = codeCount + 's 后重发';
		codeTimer = setInterval(() => {
			codeCount--;
			if (codeCount <= 0) {
				clearInterval(codeTimer);
				btn.disabled = false;
				btn.textContent = '获取验证码';
			} else {
				btn.textContent = codeCount + 's 后重发';
			}
		}, 1000);
		document.getElementById('loginCode').value = '123456';
		document.getElementById('codeHint').textContent = '验证码已发送（演示：123456）';
		toast('验证码已发送，请查收', 'info');
	});

	// 手机号登录
	document.getElementById('phoneLoginBtn').addEventListener('click', () => {
		const phone = document.getElementById('loginPhone').value.trim();
		const code = document.getElementById('loginCode').value.trim();
		if (!/^1\d{10}$/.test(phone)) {
			toast('请输入正确的 11 位手机号', 'warn');
			return;
		}
		if (!document.getElementById('agreeBox').checked) {
			toast('请先阅读并同意《用户协议》与《隐私政策》', 'warn');
			return;
		}
		if (code !== '123456') {
			toast('验证码错误，请输入 123456', 'error');
			return;
		}
		doLogin('phone', phone);
	});

	// 微信扫码登录（演示：直接模拟授权成功；正式需对接微信开放平台 OAuth）
	document.getElementById('wechatLoginBtn').addEventListener('click', () => doLogin('wechat', ''));

}

// 退出登录
document.getElementById('logoutBtn').addEventListener('click', () => {
	localStorage.removeItem(SESSION_KEY);
	location.hash = '#/dashboard';
	document.getElementById('loginScreen').classList.remove('hidden');
	document.querySelector('.app').classList.add('hidden');
	document.getElementById('footName').textContent = '未登录';
	document.getElementById('footRole').textContent = '请登录后使用';
	document.getElementById('footAvatar').textContent = '客';
	toast('已退出登录', 'info');
});

/* 启动 */
/* ============================================================
   自定义下拉：把所有 select.control 包成自绘面板，规避原生弹窗白边
   ============================================================ */
function initCustomSelects() {
	const CHEVRON =
		'<svg class="dd-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

	document.querySelectorAll('select.control').forEach(sel => {
		if (sel.dataset.dd) return;
		sel.dataset.dd = '1';

		const wrap = document.createElement('div');
		wrap.className = 'dd';
		sel.parentNode.insertBefore(wrap, sel);
		wrap.appendChild(sel);
		sel.classList.add('dd-original');

		const trigger = document.createElement('button');
		trigger.type = 'button';
		trigger.className = 'dd-trigger';
		trigger.innerHTML = '<span class="dd-label"></span>' + CHEVRON;
		wrap.appendChild(trigger);

		const panel = document.createElement('div');
		panel.className = 'dd-panel';
		wrap.appendChild(panel);

		const label = trigger.querySelector('.dd-label');

		function syncLabel() {
			const opt = sel.options[sel.selectedIndex];
			label.textContent = opt ? opt.textContent : '';
		}
		syncLabel();

		function buildOptions() {
			panel.innerHTML = '';
			Array.from(sel.options).forEach(o => {
				const item = document.createElement('div');
				item.className = 'dd-option' + (o.value === sel.value ? ' sel' : '');
				item.textContent = o.textContent;
				item.addEventListener('click', () => {
					sel.value = o.value;
					sel.dispatchEvent(new Event('change'));
					syncLabel();
					close();
				});
				panel.appendChild(item);
			});
		}

		function open() {
			buildOptions();
			document.querySelectorAll('.dd.open').forEach(w => {
				if (w !== wrap) w.classList.remove('open');
			});
			wrap.classList.add('open');
		}

		function close() {
			wrap.classList.remove('open');
		}

		trigger.addEventListener('click', e => {
			e.stopPropagation();
			wrap.classList.contains('open') ? close() : open();
		});
	});

	document.addEventListener('click', () => {
		document.querySelectorAll('.dd.open').forEach(w => w.classList.remove('open'));
	});
}


/* ============================================================
   批量删除 + 回到顶部
   ============================================================ */
function updateBatchBar(total) {
	const n = selectedIds.size;
	document.getElementById('selCount').textContent = n;
	document.getElementById('batchDelBtn').disabled = n === 0;
	const sa = document.getElementById('selectAll');
	sa.checked = total > 0 && n === total;
	sa.indeterminate = n > 0 && n < total;
}

document.getElementById('selectAll').addEventListener('change', e => {
	const cards = document.querySelectorAll('#listWrap .auth-card');
	cards.forEach(card => {
		const id = card.querySelector('.card-check').dataset.id;
		const cb = card.querySelector('.card-check');
		cb.checked = e.target.checked;
		card.classList.toggle('selected', e.target.checked);
		if (e.target.checked) selectedIds.add(id);
		else selectedIds.delete(id);
	});
	updateBatchBar(cards.length);
});

document.getElementById('batchDelBtn').addEventListener('click', () => {
	const n = selectedIds.size;
	if (!n) return;
	if (!confirm(`确定删除选中的 ${n} 条授权记录吗？此操作不可恢复。`)) return;
	const ids = new Set(selectedIds);
	authList = authList.filter(x => !ids.has(x.id));
	selectedIds.clear();
	save();
	renderList();
	renderDashboard();
	toast(`已批量删除 ${n} 条记录`, 'info');
});

/* 回到顶部 */
const backTopBtn = document.getElementById('backTop');
window.addEventListener('scroll', () => {
	backTopBtn.classList.toggle('show', window.scrollY > 400);
});
backTopBtn.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});
setupCreateControls();
initCustomSelects();
initCharts();
initAuth();
route();