document.addEventListener('DOMContentLoaded', function () {
    const togglePasscodes = document.getElementById('togglePasscodes');
    const newPasscodeInput = document.getElementById('New_passcode');
    const verifyPasscodeInput = document.getElementById('Verfy_passcode');
    const passwordForm = document.getElementById('passwordForm');
    const messageElement = document.getElementById('message');
    const formTitle = document.getElementById('form-title');
    const passwordNote = document.getElementById('password-note');

    function togglePasswordVisibility() {
        const isPasswordVisible = newPasscodeInput.type === 'text';
        const newType = isPasswordVisible ? 'password' : 'text';
        const newIcon = isPasswordVisible ? 'hide' : 'show';

        newPasscodeInput.type = newType;
        verifyPasscodeInput.type = newType;
    }

    function validatePasswords() {
        newPasscodeInput.classList.remove('error');
        verifyPasscodeInput.classList.remove('error');
        messageElement.textContent = '';

        if (newPasscodeInput.value && verifyPasscodeInput.value) {
            if (newPasscodeInput.value !== verifyPasscodeInput.value) {
                verifyPasscodeInput.classList.add('error');
            }
        }
    }

    function handleInput() {
        if (newPasscodeInput.value.length > 12) {
            newPasscodeInput.value = newPasscodeInput.value.slice(0, 12);
        }
        if (verifyPasscodeInput.value.length > 12) {
            verifyPasscodeInput.value = verifyPasscodeInput.value.slice(0, 12);
        }
        validatePasswords();
    }

    function handleBlur() {
        validatePasswords();
    }

    togglePasscodes.addEventListener('click', togglePasswordVisibility);

    [newPasscodeInput, verifyPasscodeInput].forEach(input => {
        input.addEventListener('input', handleInput);
        input.addEventListener('blur', handleBlur);
    });

    passwordForm.addEventListener('submit', (event) => {
        if (newPasscodeInput.value !== verifyPasscodeInput.value) {
            if (newPasscodeInput.value && verifyPasscodeInput.value) {
                event.preventDefault();
                validatePasswords();
            }
        }
    });

    const select = document.querySelector('.custom-select');
    const selected = select.querySelector('.select-selected span');
    const items = select.querySelector('.select-items');
    const options = select.querySelectorAll('.select-option');

    const languageTexts = {
        'uzb': {
            'formTitle': 'EMAIL MANZILINGIZNI KIRITING',
            'newPasscode': 'Yangi parol',
            'verifyPasscode': 'Parolni tasdiqlang',
            'passwordNote': '*Parol oddiy va eslab qolish oson bo\'lishi shart emas'
        },
        'rus': {
            'formTitle': 'Введите ваш почтовый адрес',
            'newPasscode': 'Новый пароль',
            'verifyPasscode': 'Подтвердите пароль',
            'passwordNote': '*Пароль не обязательно должен быть простым и легко запоминающимся'
        },
        'eng': {
            'formTitle': 'ENTER YOUR MAILING ADDRESS',
            'newPasscode': 'New passcode',
            'verifyPasscode': 'Verify passcode',
            'passwordNote': '*Passcode does not have to be simple and easy to remember'
        }
    };

    selected.parentElement.addEventListener('click', function () {
        select.classList.toggle('active');
    });

    options.forEach(option => {
        option.addEventListener('click', function () {
            const selectedValue = selected.textContent.trim();
            selected.textContent = this.textContent;

            options.forEach(opt => {
                if (opt.textContent.trim() === selectedValue) {
                    opt.style.display = 'block';
                }
            });

            this.style.display = 'none';

            const language = this.getAttribute('data-value');
            const texts = languageTexts[language];
            formTitle.textContent = texts.formTitle;
            newPasscodeInput.placeholder = texts.newPasscode;
            verifyPasscodeInput.placeholder = texts.verifyPasscode;
            passwordNote.textContent = texts.passwordNote;

            select.classList.remove('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.custom-select')) {
            select.classList.remove('active');
        }
    });

    const initialSelectedValue = selected.textContent.trim();
    options.forEach(option => {
        if (option.textContent.trim() === initialSelectedValue) {
            option.style.display = 'none';
        }
    });
});


