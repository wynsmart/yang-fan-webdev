(function () {
    angular
        .module("MyApp", [])
        .controller("MyAppController", MyAppController);

    function MyAppController() {
        var vm = this;
        vm.links = [
            {text: 'Assignment', href: '/assignment'},
            {text: 'Project', href: '/project'},
            {text: 'Demo Video', href: '#'},
            {text: 'MongoDB Test', href: '/test'},
            {text: 'GitHub.com', href: 'https://github.com/wynsmart/yang-fan-webdev'},
        ];
        vm.profileImg = './profile.jpg';
        vm.name = 'Fan Yang';
        vm.linkedin = 'https://www.linkedin.com/in/fan-yang-38a70984';
        vm.education = [
            {
                school: 'Northeastern University, Boston, MA',
                department: 'College of Computer and Information Science',
                date: 'Sep 2015 - Present',
                degree: 'Candidate for a Master of Science in Computer Science',
                courses: 'Web Development, Managing Software Development, Algorithms, Foundations of AI, Programing Design Paradigm, Network Security',
            },
            {
                school: 'Xiamen University, Xiamen, China',
                department: 'College of Electronic Information Science & Technology',
                date: 'June 2014',
                degree: 'Bachelor’s Degree in Engineering',
                courses: 'C Language Programming, JSP, Programming in Matlab, Java Programming and Practice, Introduction to Computer Network Security, Principle and Application of Microcomputer',
            }
        ];
        vm.skils = [
            {
                field: 'Programming Languages',
                skills: 'Python, JavaScript, Racket, Objective-C, Java, HTML, CSS, PHP',
            },
            {
                field: 'Operating Systems',
                skills: 'Mac OS X, Windows XP/Vista/7/8/10, Ubuntu',
            },
            {
                field: 'Software',
                skills: 'Atom, PyCharm, WebStorm, Xcode, Sublime Text, DrRacket, Photoshop, Sketch 3',
            },
            {
                field: 'Database',
                skills: 'MySQL, MongoDB',
            },
            {
                field: 'Web Development',
                skills: 'Hack, React, Thrift, PHP, JavaScript, HTML, CSS, MEAN Stack, Apache PHP Server',
            },
        ];
        vm.experience = [
            {
                title: 'Software Engineer Intern (Full Stack Developer)',
                institution: 'Data Warehouse Management, Facebook Inc., Menlo Park, CA',
                date: 'May 2016 – Aug 2016',
                achievements: [
                    'Designed and Implemented Split and Lifecycle backend services (Thrift, Python) of namespace manager',
                    'Developed frontend of Split workflow of namespace manager in web (Hack, React), and CLI tools',
                    'Implemented a table schema lock mechanism in metastore service (Java)',
                ],
            }
        ];
        vm.projects = [
            {
                name: 'Secure Instant Messenger',
                institution: 'Northeastern University, Boston, MA',
                date: 'Nov 2015',
                achievements: [
                    'Designed an instant messenger app with secure protocols including login, transfer, control, and logout',
                    'Implemented with Python running in terminal, using cryptography and TCP sockets',
                    'Providing features like DoS resistance, weak password, end-point hiding, and perfect forward secrecy',
                ],
            },
            {
                name: 'DICOM Viewer for iPad',
                institution: 'Xiamen University, Xiamen, China',
                date: 'May 2014',
                achievements: [
                    'Developed an iPad app to display, edit, and animate DICOM medical images (Obj-C, Cocoa Touch, MVC)',
                    'Published on iTunes Store for free downloads (http://appcrawlr.com/ios/dicom-viewer-by-ismart)',
                    'Featuring Dropbox file import using Dropbox API',
                    'Featuring image adjustments using Core Image library in Cocoa Touch framework',
                    'Wrapped part of the C++ library, DCMTK, into Objective-C to process DICOM format images',
                    'Reached 1.28K downloads in months by users from all over the world',
                ],
            },
        ];
        vm.interests = [
            'Learning latest technology, and apply them into real life to improve working experience and efficiency',
            'Developed a homepage for my clan of the game Clash of Clans (http://thelokis.getforge.io)',
        ];
    }
})();
