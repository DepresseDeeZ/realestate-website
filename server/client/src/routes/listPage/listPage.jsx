import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;

// import "./listPage.scss";
// import Filter from "../../components/filter/Filter";
// import Card from "../../components/card/Card";
// import Map from "../../components/map/Map";
// import { listData } from "../../lib/dummydata"; // Import your dummy data
// import { Suspense } from "react";

// function ListPage() {
//   // Use dummy data instead of useLoaderData
//   const data = listData;

//   return (
//     <div className="listPage">
//       <div className="listContainer">
//         <div className="wrapper">
//           <Filter />
//           {/* Display cards using dummy data */}
//           {data.map(item => (
//             <Card key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//       <div className="mapContainer">
//         {/* Display map with dummy data */}
//         <Map items={data} />
//       </div>
//     </div>
//   );
// }

// export default ListPage;

