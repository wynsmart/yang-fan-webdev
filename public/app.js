(function () {
    angular
        .module("MyApp", [])
        .controller("MyAppController", MyAppController);

    function MyAppController() {
        var vm = this;
        vm.dropdowns = {
            Assignment: {
                'Website': '/assignment',
                'GitHub.com': 'https://github.com/wynsmart/yang-fan-webdev',
            },
            Project: {
                'Website': 'http://ec2-54-70-113-60.us-west-2.compute.amazonaws.com:8080',
                'GitHub.com': 'https://github.com/wynsmart/emustock',
                'Documentation': 'https://docs.google.com/document/d/1U5iJ8ODmOl0prdQHBIjg3bB-zX1dGcAFwzG6Wtet9uY/edit?usp=sharing_eixpa_nl&ts=584cdd71',
            },
        };
        vm.links = {
            'MongoDB Test': '/test',
        };
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
            {
                name: 'EELAB Department Portal (http://eel.xmu.edu.cn)',
                institution: 'Xiamen University, Xiamen, China',
                date: 'July 2013',
                achievements: [
                    'Developed and published online a website for Electronic Engineering Laboratory of Xiamen University',
                    'Implemented with HTML, CSS and JavaScript for front-end; PHP for back-end; MySQL for database; Adobe Photoshop for UI design, and Apache PHP for server hosting',
                    'Provided management portal for administrators to post new articles and maintain the website',
                    'Implemented a Rich-Text Editor using HTML ‘contentEditable’ and JavaScript ‘execCommand’',
                ],
            },
        ];
        vm.interests = [
            'Learning latest technology, and applying them into real life to improve working experience and efficiency',
            'Developed a homepage for my clan of the game Clash of Clans (http://thelokis.getforge.io)',
        ];
    }
})();
