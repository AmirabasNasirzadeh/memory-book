export default function App() {
  return (
    <div>
      <h1 className="header--1">
        <span className="bold">M</span>emory <span className="bold">B</span>ook
        📔
      </h1>
      <div className="buttons--container">
        <p className="button">New memory</p>
        <p className="button">Sort ASC</p>
        <p className="button">Delete all</p>
      </div>
      <div className="container">
        <div className="memory">
          <h2 className="header--2">A really fun stroy about niggers!</h2>
          <p className="memory--date">Date created: 1/23/2025</p>
          <p className="memory--content">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Read Less
          </p>
          <div className="memory--buttons__container">
            <p className="button">Delete</p>
            <p className="button">Edit</p>
          </div>
        </div>

        <div className="memory">
          <h2 className="header--2">A really fun stroy about niggers!</h2>
          <p className="memory--date">Date created: 1/23/2025</p>
          <p className="memory--content">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat... Read More
          </p>
        </div>

        <div className="memory">
          <h2 className="header--2">A really fun stroy about niggers!</h2>
          <p className="memory--date">Date created: 1/23/2025</p>
          <p className="memory--content">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat... Read More
          </p>
        </div>
      </div>
    </div>
  );
}
