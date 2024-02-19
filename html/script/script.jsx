document.querySelector('.floatingBtn').addEventListener(
'click',
function () {
    this.classList.remove('floatingBtn');
},
true,
);

document.querySelector('.miniPlayer .close').addEventListener(
'click',
() => {
    document.querySelector('.miniPlayer').classList.add('floatingBtn');
},
true,
);

// tooptip
document.querySelector('.progress').addEventListener(
    'mousover',
    () => {
        document.querySelector('.tooltip').computedStyleMap.display = 'block';
    },
    true,
    );

    document.querySelector('.progress').addEventListener(
        'mousover',
        () => {
            document.querySelector('.tooltip').computedStyleMap.display = 'none';
        },
        true,
        );
