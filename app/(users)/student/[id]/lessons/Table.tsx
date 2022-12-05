"use client";
import { TLesson, TUser } from "../../../../../typings";
import Link from "next/link";
import InfoModal from "../../../../(admin)/teacher/[id]/student/[studentId]/InfoModal";
import {
  Table as TTable,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

interface Props {
  id?: string;
  lessons: TLesson[];
}

function Table({ id, lessons }: Props) {
  const theme = useTheme(getTheme());

  //   let columns = [
  //     { name: "Title", selector: (row: any) => row.title },
  //     { name: "Dances", selector: (row: any) => row.dances },
  //     { name: "date", selector: (row: any) => row.date },
  //   ];

  let nodes: any[] = lessons.map((l) => ({
    id: l._id,
    title: l.title,
    dances: l.dances.map((d) => d.name)?.join(" "),
    date: l.date,
    description: l.content,
  }));

  const data = { nodes };

  return (
    <TTable data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Id</HeaderCell>
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Dances</HeaderCell>
              <HeaderCell>Date</HeaderCell>
              <HeaderCell>Description</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.id}</Cell>
                <Cell>
                  <Link href={`/student/${id}/lessons/${item.id}`}>
                    {item.title}
                  </Link>
                </Cell>
                <Cell>{item.dances}</Cell>
                <Cell>{item.date}</Cell>
                <Cell>
                  <InfoModal title={"Description"}>
                    {item.description}
                  </InfoModal>
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </TTable>
  );
}

export default Table;
