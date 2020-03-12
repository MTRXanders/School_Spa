using Microsoft.EntityFrameworkCore.Migrations;

namespace School_Spa.Migrations
{
    public partial class TestingFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Answers",
                table: "TestsResults",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TestId",
                table: "Question",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answers",
                table: "TestsResults");

            migrationBuilder.AlterColumn<string>(
                name: "TestId",
                table: "Question",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
