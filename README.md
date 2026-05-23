# IT Studio Slon — Website

Сайт студии мобильной разработки. / Mobile development studio website.

## Быстрый старт / Quick Start

### 1. Загрузить на GitHub

```bash
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/itstudioslon/itstudioslon.github.io.git
git branch -M main
git push -u origin main
```

### 2. Включить GitHub Pages

1. Открыть **Settings → Pages** в репозитории
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Сохранить — сайт будет доступен по адресу `https://itstudioslon.github.io`

---

## Подключение своего домена / Custom Domain

1. Переименуйте `CNAME.example` в `CNAME`
2. Укажите в нём ваш домен (например, `itstudioslon.ru`)
3. У DNS-провайдера добавьте записи:

**Для `www.itstudioslon.ru`:**
```
CNAME  www  itstudioslon.github.io
```

**Для apex-домена `itstudioslon.ru`:**
```
A  @  185.199.108.153
A  @  185.199.109.153
A  @  185.199.110.153
A  @  185.199.111.153
```

4. В Settings → Pages укажите Custom domain и включите **Enforce HTTPS**

---

## Логотип на английском / English Logo

Чтобы добавить отдельный логотип для англоязычных пользователей:

1. Поместите файл `logo-en.jpg` в папку `assets/`
2. В файле `js/i18n.js` найдите строку:
   ```js
   en: { src: "assets/logo.jpg", alt: "IT Studio Slon" }
   ```
3. Измените на:
   ```js
   en: { src: "assets/logo-en.jpg", alt: "IT Studio Slon" }
   ```

---

## Структура / Structure

```
itstudioslon/
├── index.html          # Главная страница
├── css/
│   └── style.css       # Стили (светлая + тёмная тема)
├── js/
│   ├── i18n.js         # Переводы RU/EN
│   └── main.js         # Логика: язык, анимации
├── assets/
│   └── logo.jpg        # Логотип
├── CNAME.example       # Шаблон для своего домена
└── README.md
```
