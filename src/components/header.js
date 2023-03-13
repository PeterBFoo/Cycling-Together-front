
function Header() {
    this.template = `
    <div class="header">
        <h1>{{title content}}</h1>
        <nav>
            <a id="home" href="./index.html">Home</a>
            <a id="mybooking" href="./myBooking.html">My booking</a>
        </nav>
    </div>`;

    this.props = {
        title: {
            content: ""
        }
    }
}

var headerComponent = {
    fillable: {
        title: {
            content: "{{title content}}"
        }
    },

    fillTemplate: function (head) {
        let header = new Header();
        let template = header.template;
        let props = header.props;

        props.title.content = head.title;

        template = template.replace(this.fillable.title.content, props.title.content);

        return template;
    },

    fillTemplateDefault: function () {
        let header = new Header();
        let template = header.template;
        let props = header.props;

        props.title.content = "Cycling Together";

        template = template.replace(this.fillable.title.content, props.title.content);

        return template;
    }
}
