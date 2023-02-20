
function Footer() {
    this.template = `
    <div class="footer">
      <p>{{title content}}</p>
    </div>`;
    this.props = {
        title: {
            content: ""
        },
        subtitle: {
            content: ""
        }
    }
}

var footerComponent = {
    fillable: {
        title: {
            content: "{{title content}}"
        },
        subtitle: {
            content: "{{subtitle content}}"
        }
    },

    fillTemplate: function (fo) {
        let footer = new Footer();
        let template = footer.template;
        let props = footer.props;

        props.title.content = fo.title;
        props.subtitle.content = fo.subtitle;

        template = template.replace(this.fillable.title.content, props.title.content);
        template = template.replace(this.fillable.subtitle.content, props.subtitle.content)

        return template;
    },

    fillTemplateDefault: function () {
        let footer = new Footer();
        let template = footer.template;
        let props = footer.props;

        props.title.content = "Project made with Vanilla JS";
        props.subtitle.content = "Default Subtitle";

        template = template.replace(this.fillable.title.content, props.title.content);
        template = template.replace(this.fillable.subtitle.content, props.subtitle.content)

        return template;
    }
}